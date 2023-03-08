import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  if (req.body) {
    res.status(200).send(req.body);
  }
}

export function logout(req: Request, res: Response) {
  if (req.body) {
    res.status(200).send(req.body);
  }
}

export async function check(req: Request, res: Response) {
  if (req.body) {
    res.status(200).send(req.body);
  }
}
