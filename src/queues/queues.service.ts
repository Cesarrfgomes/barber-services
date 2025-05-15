import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import CreateQueueDto from "./dtos/create-queue";

@Injectable()
export class QueuesService {
  constructor(private readonly prisma: PrismaService) {}

  async createQueue(data: CreateQueueDto) {
    return await this.prisma.queue.create({ data });
  }

  async queueExpertExistToday(expert_id: number) {
    return await this.prisma.queue.findFirst({
      where: { expert_id, createdAt: { equals: new Date() } },
    });
  }

  async getQueues() {
    return await this.prisma.queue.findMany();
  }

  async getExpertQueues(expert_id: number) {
    return await this.prisma.queue.findMany({
      where: { expert_id: Number(expert_id) },
    });
  }

  async getTodayQueues() {
    const todayQueues = await this.prisma.queue.findMany({
      where: { createdAt: { equals: new Date() } },
      include: { expert: true, CustomerQueue: true },
    });

    return todayQueues.map(queue => {
      return {
        ...queue,
        CustomerQueue: queue.CustomerQueue.filter(
          customer => customer.isAwaiting,
        ),
      };
    });
  }

  async deleteCustomer(id: number) {
    await this.prisma.customerQueue.delete({ where: { id } });
  }
}
