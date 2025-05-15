import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import CreateUserDto from "./dto/create-user";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const encryptedPass = await bcrypt.hash(data.password, 10);

    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: encryptedPass,
        phone: data.phone,
      },
    });
  }

  async findUsers() {
    return await this.prisma.user.findMany();
  }

  async findUserById(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }
}
