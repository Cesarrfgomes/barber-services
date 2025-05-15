import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { ExpertsService } from "./experts.service";
import CreateExpertsDto from "./dtos/create-experts";
import { Response } from "express";
import UpdateExpertDto from "./dtos/update-expert";

@Controller("experts")
export class ExpertsController {
  constructor(private readonly expertsService: ExpertsService) {}

  @Post()
  async create(@Body() data: CreateExpertsDto, @Res() res: Response) {
    const expertExist = await this.expertsService.findExpertByEmail(data.email);

    if (expertExist) {
      throw new BadRequestException("Email já está em uso");
    }

    const expert = await this.expertsService.createExpert(data);

    return res.status(HttpStatus.CREATED).json(expert);
  }

  @Get()
  async getExperts(@Res() res: Response) {
    const experts = await this.expertsService.findAllExperts();

    return res.json(experts);
  }

  @Get(":id")
  async getExpert(@Param("id") id: number, @Res() res: Response) {
    const expert = await this.expertsService.findExpert(id);

    if (!expert) {
      throw new NotFoundException("Usuário não econtrado.");
    }

    return res.json(expert);
  }

  @Put(":id")
  async updateExpert(
    @Param("id") id: number,
    @Body() data: UpdateExpertDto,
    @Res() res: Response,
  ) {
    const expert = await this.expertsService.findExpert(id);

    if (!expert) {
      throw new NotFoundException("Usuário não econtrado.");
    }

    if (data.email) {
      const emailExist = await this.expertsService.findExpertByEmail(
        data.email,
      );

      if (emailExist && emailExist.email !== expert.email) {
        throw new BadRequestException("Email já está em uso");
      }
    }

    await this.expertsService.updateExpert(id, data);

    return res.status(HttpStatus.NO_CONTENT).json();
  }
}
