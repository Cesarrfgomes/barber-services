import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import CreateExpertsDto from "./dtos/create-experts";
import UpdateExpertDto from "./dtos/update-expert";

@Injectable()
export class ExpertsService {
  constructor(private readonly prisma: PrismaService) {}

  async findExpertByEmail(email: string) {
    return await this.prisma.expert.findFirst({ where: { email } });
  }

  async createExpert(data: CreateExpertsDto) {
    return await this.prisma.expert.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    });
  }

  async findAllExperts() {
    return await this.prisma.expert.findMany();
  }

  async findExpert(id: number) {
    return await this.prisma.expert.findFirst({
      where: {
        id: Number(id),
      },
    });
  }

  async updateExpert(id: number, data: UpdateExpertDto) {
    return await this.prisma.expert.update({ data, where: { id: Number(id) } });
  }
}
