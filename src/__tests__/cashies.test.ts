import { CashieController } from '@src/controllers/cashie';
import { Request, Response} from 'express';

const controllerCashie = new CashieController()


describe("POST /cashies", () => {

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
        await controllerCashie.createCashie(request as Request, response as Response);
        expect(responseObject).toBe(201);
    })
});


describe("GET /cashies", () => {

    test('Should return a list of cashies', async() => {
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
        await controllerCashie.getCashie(request as Request, response as Response);
        expect(responseObject).toEqual([
            {
                "_id": "64582ea5d80d9360ccb62970",
                "user": {
                    "_id": "644d9cea62f5bc5607ada8de",
                    "fullName": "Teste Angular One",
                    "email": "sakel54052@pixiil.com",
                    "phone": 22222222222,
                    "cpfCnpj": 51997046059,
                    "createdAt": "2023-04-29T22:40:42.368Z",
                    "updatedAt": "2023-04-29T22:40:42.368Z",
                    "__v": 0
                },
                "orders": [],
                "valorAbertura": 1256,
                "criadoEm": "07/05/2023",
                "status": true,
                "createdAt": "2023-05-07T23:05:09.185Z",
                "updatedAt": "2023-05-07T23:05:09.185Z",
                "__v": 0
            },
            {
                "_id": "6459cbe1d80d9360ccb629d4",
                "user": {
                    "_id": "644d9cea62f5bc5607ada8de",
                    "fullName": "Teste Angular One",
                    "email": "sakel54052@pixiil.com",
                    "phone": 22222222222,
                    "cpfCnpj": 51997046059,
                    "createdAt": "2023-04-29T22:40:42.368Z",
                    "updatedAt": "2023-04-29T22:40:42.368Z",
                    "__v": 0
                },
                "orders": [
                    {
                        "_id": "645a9090806b816d1af8a150",
                        "produtos": [
                            "6456714956badda25d420708",
                            "6456714956badda25d420708",
                            "6456714956badda25d420708"
                        ],
                        "nvenda": 316442,
                        "total": 30.599999999999998,
                        "formaPagamento": "Cartão de Débito",
                        "user": "644d9cea62f5bc5607ada8de",
                        "status": true,
                        "createdAt": "2023-05-09T18:27:28.042Z",
                        "updatedAt": "2023-05-09T18:27:28.042Z",
                        "__v": 0
                    },
                    {
                        "_id": "645a9234806b816d1af8a16f",
                        "produtos": [
                            "6456714956badda25d420708",
                            "6456714956badda25d420708",
                            "6456714956badda25d420708"
                        ],
                        "nvenda": 846223,
                        "total": 30.599999999999998,
                        "formaPagamento": "Cartão de Débito",
                        "user": "644d9cea62f5bc5607ada8de",
                        "status": true,
                        "createdAt": "2023-05-09T18:34:28.756Z",
                        "updatedAt": "2023-05-09T18:34:28.756Z",
                        "__v": 0
                    },
                    {
                        "_id": "645a9707806b816d1af8a17b",
                        "produtos": [
                            "6456714956badda25d420708",
                            "6456714956badda25d420708",
                            "6456714956badda25d420708",
                            "6456714956badda25d420708",
                            "6456714956badda25d420708"
                        ],
                        "nvenda": 248166,
                        "total": 51,
                        "formaPagamento": "Cartão de Débito",
                        "user": "644d9cea62f5bc5607ada8de",
                        "status": true,
                        "createdAt": "2023-05-09T18:55:03.104Z",
                        "updatedAt": "2023-05-09T18:55:03.104Z",
                        "__v": 0
                    },
                    {
                        "_id": "645aea45806b816d1af8a1ee",
                        "produtos": [
                            "6456714956badda25d420708",
                            "645ae84c806b816d1af8a1e3",
                            "645ae735806b816d1af8a1d7",
                            "645ae7da806b816d1af8a1de"
                        ],
                        "nvenda": 507121,
                        "total": 25.38,
                        "formaPagamento": "Cartão de Crédito",
                        "user": "644d9cea62f5bc5607ada8de",
                        "status": true,
                        "createdAt": "2023-05-10T00:50:13.692Z",
                        "updatedAt": "2023-05-10T00:50:13.692Z",
                        "__v": 0
                    }
                ],
                "valorAbertura": 895.62,
                "criadoEm": "09/05/2023",
                "status": false,
                "createdAt": "2023-05-09T04:28:17.522Z",
                "updatedAt": "2023-05-10T00:50:14.140Z",
                "__v": 0,
                "fechadoEm": "09/05/2023",
                "valorFechamento": 1000.62,
                "total": 105
            },
            {
                "_id": "645bfc529c7ab0e9a83e4f06",
                "user": {
                    "_id": "644d9cea62f5bc5607ada8de",
                    "fullName": "Teste Angular One",
                    "email": "sakel54052@pixiil.com",
                    "phone": 22222222222,
                    "cpfCnpj": 51997046059,
                    "createdAt": "2023-04-29T22:40:42.368Z",
                    "updatedAt": "2023-04-29T22:40:42.368Z",
                    "__v": 0
                },
                "orders": [
                    {
                        "_id": "645c34cf9c7ab0e9a83e50c5",
                        "produtos": [
                            "645ae7da806b816d1af8a1de",
                            "6456714956badda25d420708",
                            "6456714956badda25d420708",
                            "6456714956badda25d420708"
                        ],
                        "nvenda": 373019,
                        "total": 34.8,
                        "formaPagamento": "Dinheiro",
                        "troco": 15.200000000000003,
                        "valorPago": 50,
                        "user": "644d9cea62f5bc5607ada8de",
                        "status": true,
                        "createdAt": "2023-05-11T00:20:31.360Z",
                        "updatedAt": "2023-05-11T00:20:31.360Z",
                        "__v": 0
                    },
                    {
                        "_id": "645c44039f762ce1ac8411f8",
                        "produtos": [
                            "645ae84c806b816d1af8a1e3",
                            "645ae84c806b816d1af8a1e3",
                            "645ae84c806b816d1af8a1e3",
                            "645ae84c806b816d1af8a1e3",
                            "645ae84c806b816d1af8a1e3"
                        ],
                        "nvenda": 392496,
                        "total": 25,
                        "formaPagamento": "Cartão de Crédito",
                        "user": "644d9cea62f5bc5607ada8de",
                        "status": true,
                        "createdAt": "2023-05-11T01:25:23.150Z",
                        "updatedAt": "2023-05-11T01:25:23.150Z",
                        "__v": 0
                    }
                ],
                "valorAbertura": 259.5,
                "criadoEm": "10/05/2023",
                "status": false,
                "createdAt": "2023-05-10T20:19:30.650Z",
                "updatedAt": "2023-05-11T02:53:49.792Z",
                "__v": 0,
                "fechadoEm": "10/05/2023",
                "valorFechamento": 59.8
            },
            {
                "_id": "645fa5b219f95f5286c228c6",
                "user": {
                    "_id": "644d9cea62f5bc5607ada8de",
                    "fullName": "Teste Angular One",
                    "email": "sakel54052@pixiil.com",
                    "phone": 22222222222,
                    "cpfCnpj": 51997046059,
                    "createdAt": "2023-04-29T22:40:42.368Z",
                    "updatedAt": "2023-04-29T22:40:42.368Z",
                    "__v": 0
                },
                "orders": [
                    {
                        "_id": "645fa5e019f95f5286c228d2",
                        "produtos": [
                            "645ae84c806b816d1af8a1e3",
                            "645ae84c806b816d1af8a1e3",
                            "645ae84c806b816d1af8a1e3",
                            "645ae84c806b816d1af8a1e3",
                            "645ae84c806b816d1af8a1e3",
                            "645ae84c806b816d1af8a1e3",
                            "645ae84c806b816d1af8a1e3",
                            "645ae84c806b816d1af8a1e3"
                        ],
                        "nvenda": 318507,
                        "total": 40,
                        "formaPagamento": "Cartão de Débito",
                        "user": "644d9cea62f5bc5607ada8de",
                        "status": true,
                        "createdAt": "2023-05-13T14:59:44.428Z",
                        "updatedAt": "2023-05-13T14:59:44.428Z",
                        "__v": 0
                    }
                ],
                "valorAbertura": 200.5,
                "criadoEm": "13/05/2023",
                "status": true,
                "createdAt": "2023-05-13T14:58:59.125Z",
                "updatedAt": "2023-05-13T14:59:44.957Z",
                "__v": 0
            },
            {
                "_id": "6462458365376a28e90fab0b",
                "user": {
                    "_id": "644d9cea62f5bc5607ada8de",
                    "fullName": "Teste Angular One",
                    "email": "sakel54052@pixiil.com",
                    "phone": 22222222222,
                    "cpfCnpj": 51997046059,
                    "createdAt": "2023-04-29T22:40:42.368Z",
                    "updatedAt": "2023-04-29T22:40:42.368Z",
                    "__v": 0
                },
                "orders": [
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
                ],
                "valorAbertura": 890,
                "criadoEm": "15/05/2023",
                "status": true,
                "createdAt": "2023-05-15T14:45:23.308Z",
                "updatedAt": "2023-05-15T14:46:58.816Z",
                "__v": 0
            }
        ]);
    })
});


describe("GET /cashies/:id", () => {

    it("Should be to return a cashie by id", async () => {
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
        await controllerCashie.getCashieById(request as Request, response as Response);
        expect(responseObject).toEqual({
            "_id": "64582ea5d80d9360ccb62970",
            "user": "644d9cea62f5bc5607ada8de",
            "orders": [],
            "valorAbertura": 1256,
            "criadoEm": "07/05/2023",
            "status": true,
            "createdAt": "2023-05-07T23:05:09.185Z",
            "updatedAt": "2023-05-07T23:05:09.185Z",
            "__v": 0
        });
      });
});

describe("POST /cashies/day/:id", () => {

    it("Should be to return a cashie by id", async () => {
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
        await controllerCashie.getCashieByDay(request as Request, response as Response);
        expect(responseObject).toEqual({
            "_id": "6462458365376a28e90fab0b",
            "user": {
                "_id": "644d9cea62f5bc5607ada8de",
                "fullName": "Teste Angular One",
                "email": "sakel54052@pixiil.com",
                "phone": 22222222222,
                "cpfCnpj": 51997046059,
                "createdAt": "2023-04-29T22:40:42.368Z",
                "updatedAt": "2023-04-29T22:40:42.368Z",
                "__v": 0
            },
            "orders": [
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
            ],
            "valorAbertura": 890,
            "criadoEm": "15/05/2023",
            "status": true,
            "createdAt": "2023-05-15T14:45:23.308Z",
            "updatedAt": "2023-05-15T14:46:58.816Z",
            "__v": 0
        });
      });
    });