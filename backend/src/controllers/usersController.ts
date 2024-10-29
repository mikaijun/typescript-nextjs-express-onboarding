import { Body, Controller, Get, Path, Post, Route, Response } from "tsoa";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

type UserCreationParams = Pick<User, "email" | "name" | "password">;
interface ValidateErrorJSON {
  message: "Validation failed";
  details: { [name: string]: unknown };
}

@Route("users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(@Path() userId: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  @Response<ValidateErrorJSON>(422, "Validation Failed")
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams,
  ): Promise<void> {
    await prisma.user.create({
      data: { ...requestBody },
    });
    return;
  }
}
