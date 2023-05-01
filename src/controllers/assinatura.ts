import {
    Controller,
    Post,
} from "@overnightjs/core";
import { Request, Response } from "express";
import logger from "@src/logger";
import { AssinaturaMongoDbRepository } from "@src/repositories/assinaturaMongoDbRepository";
import { Assinatura } from "@src/models/assinatura";
import AuthService from "@src/services/auth";


@Controller("v1/api/users")
export class AssinaturaController extends AssinaturaMongoDbRepository {

    @Post("/signature")
    public async assinatura(req: Request, res: Response): Promise<void> {
        try {
            return await this.findAssinatura(req.body.email)
                .then(async (apikey) => {
                    if (apikey) {
                        res.status(400).send({ message: "E-mail already was used to generate key!" });
                    } else {
                        const token = AuthService.generatePublicApiToken(req.body.email);
                        res.status(200).send({public_api_key: token});
                        const assinatura = new Assinatura({ apikey: token, email: req.body.email, status: true })
                        if(token){
                            await this.create(assinatura);
                        }
                        
                    }
                }).finally();

        } catch (error) {
            logger.error(error);
            res.status(500).send(error).json();
        }
    }


}

