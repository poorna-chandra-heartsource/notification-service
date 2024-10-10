import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IMail } from "../interfaces/email.interface";

export class SendMailDto implements IMail {
    @IsString()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsOptional()
    text: string;

    @IsString()
    @IsOptional()
    html?: string;
}