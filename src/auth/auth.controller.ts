import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import LocalAuthGuard from "./guards/local-guards";
import { AuthService } from "./auth.service";
import JwtAuthGuard from "./guards/jwt-guard";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: Request, @Res() res: Response) {
    const { user } = req;
    const token = await this.authService.login(user);

    return res.json({ user, token: token.access_token });
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Req() req: Request, @Res() res: Response) {
    const { user } = req;

    return res.json(user);
  }
}
