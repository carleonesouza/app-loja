import { Store } from "@src/models/store";
import { Request, Response, NextFunction } from "express";

export async function userAuthMiddleware(
    req: Partial<Request>,
    res: Response,
    next: NextFunction
): Promise<void> {
// adminUser.profile?.role.toLowerCase().localeCompare(String("Admin").toLocaleLowerCase()) === 1
    try {
        const storeModel = Store;
        const adminUser = await storeModel.findOne({ _id: req?.params?.id }).exec();
        if (!adminUser?.apiKey) {
                throw new Error('Unauthorized!');
        }
        next();
    } catch (err) {
        res.status(401).json(err);
    }

}