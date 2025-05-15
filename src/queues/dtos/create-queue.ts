import { IsNotEmpty } from "class-validator";

export default class CreateQueueDto {
  @IsNotEmpty({ message: "O campo expert é obrigatório" })
  expert_id: number;
}
