import { IsEmail, IsNotEmpty } from "class-validator";

export default class FindExpertByEmailDto {
  @IsNotEmpty({ message: "o campo email é obrigatório" })
  @IsEmail({}, { message: "Formato de email incorreto." })
  email: string;
}
