import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export default class CreateExpertsDto {
  @IsNotEmpty({ message: "o campo nome é obrigatório" })
  name: string;

  @IsNotEmpty({ message: "o campo nome é obrigatório" })
  @IsEmail({}, { message: "Email no formato iválido" })
  email: string;

  @IsOptional()
  phone?: string;
}
