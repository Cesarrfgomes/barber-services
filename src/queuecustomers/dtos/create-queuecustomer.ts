import { IsNotEmpty } from "class-validator";

export default class CreateQueuecustomerDto {
  @IsNotEmpty({ message: "O campo nome deve ser preenchido" })
  name: string;

  @IsNotEmpty({ message: "o campo service deve ser preenchido" })
  service: string;

  @IsNotEmpty({ message: "Escolha uma fila" })
  queue_id: number;
}
