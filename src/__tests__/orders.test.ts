
import { OrderController } from "@src/controllers/order";
import { Request, Response} from 'express';



const controller = new OrderController();


describe("POST /orders", () => {

    test('Should respond with 201 created', async() => {
        let responseObject = {};
        const request = {};
        const response:Partial<Response> = {
            json: jest.fn().mockImplementation((result) =>{
                responseObject = result;
            }),
            status: jest.fn().mockImplementation(
                (result) =>{
                    responseObject = result;
                }
            ),
            send: jest.fn().mockImplementation(
                (result) =>{
                    responseObject = result;
                }
            )
        };
        await controller.createOrder(request as Request, response as Response);
        
       expect(responseObject).toEqual(201);
    })
});


describe("GET /orders", () => {
    test('Should return a list of orders', async() => {
        let responseObject = {};
        const request = {};
        const response:Partial<Response> = {
            json: jest.fn().mockImplementation((result) =>{
                responseObject = result;
            }),
            status: jest.fn().mockImplementation(
                (result) =>{
                    responseObject = result;
                }
            ),
            send: jest.fn().mockImplementation(
                (result) =>{
                    responseObject = result;
                }
            )
        };
        controller.getOrders(request as Request, response as Response);
          
        expect(responseObject).toEqual([
                {
                    "_id": "646245e265376a28e90fab29",
                    "produtos": [
                        "645ae7da806b816d1af8a1de",
                        "6456714956badda25d420708",
                        "6456714956badda25d420708",
                        "645ae84c806b816d1af8a1e3",
                        "645ae84c806b816d1af8a1e3",
                        "645ae735806b816d1af8a1d7"
                    ],
                    "nvenda": 466941,
                    "total": 40.58,
                    "formaPagamento": "Dinheiro",
                    "troco": 9.420000000000002,
                    "valorPago": 50,
                    "user": "644d9cea62f5bc5607ada8de",
                    "status": true,
                    "createdAt": "2023-05-15T14:46:58.388Z",
                    "updatedAt": "2023-05-15T14:46:58.388Z",
                    "__v": 0
                }
            ]);
    })
});


describe("GET /order/:id", () => {
    it("Should be to return a order by id", async () => {
        let responseObject = {};
        const request = {};
        const response:Partial<Response> = {
            json: jest.fn().mockImplementation((result) =>{
                responseObject = result;
            }),
            status: jest.fn().mockImplementation(
                (result) =>{
                    responseObject = result;
                }
            ),
            send: jest.fn().mockImplementation(
                (result) =>{
                    responseObject = result;
                }
            )
        };
        await controller.getOrderById(request as Request, response as Response);
        expect(responseObject).toEqual({           
                    "_id": "646245e265376a28e90fab29",
                    "produtos": [
                        "645ae7da806b816d1af8a1de",
                        "6456714956badda25d420708",
                        "6456714956badda25d420708",
                        "645ae84c806b816d1af8a1e3",
                        "645ae84c806b816d1af8a1e3",
                        "645ae735806b816d1af8a1d7"
                    ],
                    "nvenda": 466941,
                    "total": 40.58,
                    "formaPagamento": "Dinheiro",
                    "troco": 9.420000000000002,
                    "valorPago": 50,
                    "user": "644d9cea62f5bc5607ada8de",
                    "status": true,
                    "createdAt": "2023-05-15T14:46:58.388Z",
                    "updatedAt": "2023-05-15T14:46:58.388Z",
                    "__v": 0
            
        });
      });
})