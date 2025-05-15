import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import CreateUserDto from "./dto/create-user";
import { Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto, @Res() res: Response) {
    const userExists = await this.usersService.findUserByEmail(data.email);

    if (userExists) {
      throw new BadRequestException("Email esta em uso");
    }

    const newUser = await this.usersService.createUser(data);

    return res.status(HttpStatus.CREATED).json(newUser);
  }
}
