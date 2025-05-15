import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { QueuesService } from "./queues.service";
import CreateQueueDto from "./dtos/create-queue";
import { Response } from "express";
import { ExpertsService } from "src/experts/experts.service";
import JwtAuthGuard from "src/auth/guards/jwt-guard";

@Controller("queues")
export class QueuesController {
  constructor(
    private readonly queuesService: QueuesService,
    private readonly expertsService: ExpertsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createQueue(@Body() data: CreateQueueDto, @Res() res: Response) {
    const expertExist = await this.expertsService.findExpert(data.expert_id);

    if (!expertExist) {
      throw new NotFoundException("Expert não encontrado");
    }

    const queueExistToday = await this.queuesService.queueExpertExistToday(
      data.expert_id
    );

    if (queueExistToday) {
      throw new BadRequestException(
        "Já existe uma fila para esse expert na data de hoje"
      );
    }

    const newQueue = await this.queuesService.createQueue(data);

    return res.status(HttpStatus.CREATED).json(newQueue);
  }

  @Get()
  async getExpertQueues(
    @Query("expert_id") expert_id: number,
    @Res() res: Response
  ) {
    if (expert_id) {
      const expertExist = await this.expertsService.findExpert(expert_id);

      if (!expertExist) {
        throw new NotFoundException("Expert não encontrado");
      }
      const queues = await this.queuesService.getExpertQueues(expert_id);

      if (!queues) {
        throw new NotFoundException("Nenhuma fila encontrada");
      }

      return res.json(queues);
    } else {
      const queues = await this.queuesService.getQueues();

      if (!queues) {
        throw new NotFoundException("Nenhuma fila encontrada");
      }

      return res.json(queues);
    }
  }

  @Get("today")
  async getTodayQueues(@Res() res: Response) {
    const todayQueues = await this.queuesService.getTodayQueues();

    if (!todayQueues) {
      throw new NotFoundException("Nenhuma fila hoje ainda.");
    }

    return res.json(todayQueues);
  }
}
