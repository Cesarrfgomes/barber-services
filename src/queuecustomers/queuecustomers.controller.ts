import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { QueuecustomersService } from "./queuecustomers.service";
import CreateQueuecustomerDto from "./dtos/create-queuecustomer";
import { Response } from "express";
import { QueuesService } from "src/queues/queues.service";

@Controller("queuecustomers")
export class QueuecustomersController {
  constructor(
    private readonly queuecustomersService: QueuecustomersService,
    private readonly queuesService: QueuesService,
  ) {}

  @Post()
  async addCustomer(
    @Body() data: CreateQueuecustomerDto,
    @Res() res: Response,
  ) {
    const queueExist = await this.queuecustomersService.getQueueTodayById(
      data.queue_id,
    );

    if (!queueExist) {
      throw new NotFoundException("Fila não encontrada");
    }

    const newCustomerqueue = await this.queuecustomersService.addCustomer(data);

    return res.status(HttpStatus.CREATED).json(newCustomerqueue);
  }

  @Patch(":id")
  async attendCustomer(@Param("id") id: string, @Res() res: Response) {
    const customerExist = await this.queuecustomersService.getCustomerById(+id);

    if (!customerExist) {
      throw new NotFoundException("O cliente não existe");
    }

    await this.queuecustomersService.attendCustomer(customerExist.id);

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(":id")
  async deleteCustomer(@Param("id") id: string, @Res() res: Response) {
    const customer = await this.queuecustomersService.getCustomerById(+id);

    if (!customer) {
      throw new NotFoundException("Cliente não encontrado");
    }

    await this.queuecustomersService.deleteCustomer(customer.id);

    return res.json({ message: "Cliente deletado" });
  }
}
