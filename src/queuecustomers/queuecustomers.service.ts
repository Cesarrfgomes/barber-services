import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import CreateQueuecustomerDto from "./dtos/create-queuecustomer";

@Injectable()
export class QueuecustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async addCustomer(data: CreateQueuecustomerDto) {
    const queue = await this.getQueueTodayById(data.queue_id);

    if (!queue) {
      return;
    }

    return await this.prisma.customerQueue.create({
      data: {
        name: data.name,
        service: data.service,
        queue_id: queue.id,
      },
    });
  }

  async getQueueTodayById(queue_id: number) {
    return await this.prisma.queue.findFirst({ where: { id: queue_id } });
  }

  async attendCustomer(id: number) {
    await this.prisma.customerQueue.update({
      where: { id },
      data: {
        isAwaiting: false,
      },
    });
  }

  async getCustomerById(id: number) {
    return await this.prisma.customerQueue.findFirst({ where: { id } });
  }

  async deleteCustomer(id: number) {
    await this.prisma.customerQueue.delete({ where: { id } });
  }
}
