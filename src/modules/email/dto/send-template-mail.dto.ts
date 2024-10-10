import { ITemplateMail } from "../interfaces/email.interface";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SendTemplateMailDto implements ITemplateMail {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    templateName: string;
}