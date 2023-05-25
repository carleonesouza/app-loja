import "../util/module-alias";
import { Server } from "@overnightjs/core";
import * as http from "http";
import { ProductController } from "@src/controllers/product";
import { Application } from "express";
import { apiHeaderHandle } from "@src/middlewares/header-handle";
import cors from "cors";
import swaggerDocs = require("../docs/swagger.json");
import { apiErrorHandle } from "@src/middlewares/error-handle";
import { CategoryController } from "@src/controllers/category";
import * as database from "@src/config/config";
import morgan  from "morgan";
import logger from "@src/logger";
import { UserController } from "@src/controllers/user";
import { ProfileController } from "@src/controllers/profile";
import { OrderController } from "@src/controllers/order";
import { CashieController } from "@src/controllers/cashie";
import bodyParser from "body-parser";
import { AssinaturaController } from "@src/controllers/assinatura";
import { StoreController } from '../controllers/store';

/**
 * Configuração do express via Overnight
 * Fornece o express
 */
export class SetupServer extends Server {
  private server?: http.Server;

  constructor(private port = 8080) {
    super();
  }

  /**
   * Iniciar o server express
   */
  public async init(): Promise<void> {
    this.setupExpress();
    //this.setupHeader();
    await this.databaseSetup();
    this.setupErrorHandlers();
    this.setupControllers();
    this.setDocs();
  }

  public getApp(): Application {
    return this.app;
  }

  /**
   * Configurando express para lidar com json
   */
  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.options("*", cors());
  }

  /**
   * Passando o controller para o Overnight realizar o setup no
   * controller no express.
   */
  private setupControllers(): void {
    const productController = new ProductController();
    const categoryController = new CategoryController();
    const userController = new UserController();
    const profileController = new ProfileController();
    const orderController = new OrderController();
    const cashieController = new CashieController();
    const storeController = new StoreController();
    const assinaturaController = new AssinaturaController();
    this.addControllers([
      storeController,
      productController,
      categoryController,
      userController,
      profileController,
      orderController,
      cashieController,
      assinaturaController
    ]);
  }

  private setupHeader(): void {
    this.app.use(apiHeaderHandle);
  }



  private async setDocs(): Promise<void> {
  this.app.get('/api-docs',  (req, res) => {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(swaggerDocs));
  })
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorHandle);
  }

  public async close(): Promise<void> {
    await database.close();
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
      });
    }
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public start(): void {
    this.getApp().get('/', (req, res)=>{
      res.send("Hello World!");
    });
    this.server = this.app.listen(this.port, () => {
      logger.info("Server listening on port: " + this.port);
    });
  }
}
