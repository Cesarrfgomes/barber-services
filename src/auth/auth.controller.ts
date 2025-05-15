import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import LocalAuthGuard from "./guards/local-guards";

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: Request) {
    return req.user;
  }
}
