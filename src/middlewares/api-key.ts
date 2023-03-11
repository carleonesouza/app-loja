import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import baseUtil from '@src/util/baseUtil';
import { JwtToken } from "@src/entities/jwt-token";


export async function apiKey(req: Partial<Request>, res: Response, next: NextFunction): Promise<void> {
    try {

        const apiToken = generateApiKey(req?.body?.apiKey, req?.body.apiKey);
        if (apiToken) {
            const claims = validateApiKey(apiToken);
            req.context = { apiKey: claims.key };
            next();
        }else{
            throw new Error("API key Invalid!")
        }

    } catch (err) {
        if (err instanceof Error) {
            res.status?.(401).send({ code: 401, error: err.message });
        } else {
            res.status?.(401).send({ code: 401, error: "Unknown auth error" });
        }
    }
}


export function generateApiKey(apiKey: string, email: string) {
    return apiKey && email ? jwt.sign({ email: email, userKey: apiKey }, baseUtil.JWT_KEY, { expiresIn: baseUtil.LOCK_TIME, }) : null;
}

export function validateApiKey(apiKey: string): JwtToken {
    return jwt.verify(apiKey, baseUtil.JWT_KEY) as JwtToken;
}


