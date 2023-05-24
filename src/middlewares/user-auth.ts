import { User } from "@src/models/user";
import { Request, Response, NextFunction } from "express";

export async function userAuthMiddleware(
    req: Partial<Request>,
    res: Response,
    next: NextFunction
): Promise<void> {

    try {
        const userModel = User;
        const adminUser = await userModel.findOne({ _id: req?.params?.id }).populate({
            path: 'profile',
            options: { strictPopulate: false },
          })
          .select('-password').exec();
        if (!adminUser?.apiKey ||
            adminUser.profile?.role.toLowerCase().localeCompare(String("Admin").toLocaleLowerCase()) === 1) {
                throw new Error('Unauthorized!');
        }
        next();
    } catch (err) {
        res.status(401).json(err);
    }

}