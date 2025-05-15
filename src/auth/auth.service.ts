import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      return null;
    }

    const validePass = await bcrypt.compare(password, user.password);

    if (!validePass) {
      return null;
    }

    return user;
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
