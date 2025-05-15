import { IsEmail, IsNotEmpty } from "class-validator";

export default class CreateExpertsDto {
  @IsNotEmpty({ message: "o campo nome é obrigatório" })
  name: string;

  @IsNotEmpty({ message: "o campo nome é obrigatório" })
  @IsEmail({}, { message: "Formato iválido" })
  email: string;

  phone: string;
}
