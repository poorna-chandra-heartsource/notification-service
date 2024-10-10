import { IsArray, IsNotEmpty, IsObject, IsString,IsEnum, IsOptional } from "class-validator";
import { IUserCreationOrderConfirmTemplateMail, TemplateEnum } from "../interfaces/email.interface";
import { SendTemplateMailDto } from "./send-template-mail.dto";

export class UserCreationOrderConfirmDto extends SendTemplateMailDto implements IUserCreationOrderConfirmTemplateMail {
    @IsEnum(TemplateEnum)
    @IsNotEmpty()
    templateName: TemplateEnum = TemplateEnum.USER_CREATION_ORDER_MAIL;

    @IsObject()
    @IsNotEmpty()
    order: Record<string, any>;

    @IsObject()
    @IsNotEmpty()
    shippingAddress: Record<string, any>;

    @IsString()
    @IsOptional()
    passwordResetLink: string
}