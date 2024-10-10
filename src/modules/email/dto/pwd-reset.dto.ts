import { IsArray, IsNotEmpty, IsObject, IsString,IsEnum, IsOptional } from "class-validator";
import { IPwdResetTemplateMail, IUserCreationOrderConfirmTemplateMail, TemplateEnum } from "../interfaces/email.interface";
import { SendTemplateMailDto } from "./send-template-mail.dto";

export class PasswordResetDto extends SendTemplateMailDto implements IPwdResetTemplateMail {   
    @IsEnum(TemplateEnum)
    @IsNotEmpty()
    templateName: TemplateEnum = TemplateEnum.PWD_RESET_MAIL;

    @IsString()
    @IsNotEmpty()
    passwordResetLink: string
}