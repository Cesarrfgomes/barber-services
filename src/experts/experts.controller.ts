import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { ExpertsService } from "./experts.service";
import CreateExpertsDto from "./dtos/create-experts";
import { Response } from "express";
import FindExpertByEmailDto from "./dtos/find-experts";

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
}
