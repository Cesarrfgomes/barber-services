import { Module } from "@nestjs/common";
import { QueuecustomersService } from "./queuecustomers.service";
import { QueuecustomersController } from "./queuecustomers.controller";
import { QueuesService } from "src/queues/queues.service";

@Module({
  controllers: [QueuecustomersController],
  providers: [QueuecustomersService, QueuesService],
})
export class QueuecustomersModule {}
