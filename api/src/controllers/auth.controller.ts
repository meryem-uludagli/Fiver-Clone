import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user.model.ts";
import jwt from "jsonwebtoken";

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const hashedPass: string = bcrypt.hashSync(req.body.password, 12);
    const image = await upload(req.file?.path as string, next);
    req.body.photo = image.secure_url;
    const newUser: IUser = await User.create({
      ...req.body,
      password: hashedPass,
    });
    const { password, ...userWithoutPass } = newUser;
    res
      .status(200)
      .json({ message: "Hesabınız oluşturuldu", data: userWithoutPass });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user: IUser | null = await User.findOne({
      username: req.body.username,
    });

    if (!user) return next(error(404, "Girdiğiniz bilgiler yanlış"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect) return next(error(404, "Girdiğiniz bilgiler yanlış"));

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY as string,
      {
        expiresIn: process.env.JWT_DURATION as string,
      }
    );

    user.password = "";

    res
      .cookie("token", token, {
        httpOnly: false,
        sameSite: "lax",
        expires: new Date(Date.now() + 14 * 24 * 3600 * 1000),
      })
      .status(200)
      .json({ message: "Hesaba giriş yapıldı", token, user: user });
  }
);

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
