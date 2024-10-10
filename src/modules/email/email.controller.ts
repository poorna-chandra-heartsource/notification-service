import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { EmailQueueService } from './email.queue.service';
import { EmailService } from './email.service';
import { UserCreationOrderConfirmDto } from './dto/order-confirm.dto';
import { SendMailDto } from './dto/send-mail.dto';
import { PasswordResetDto } from './dto/pwd-reset.dto';

@Controller('email')
export class EmailController {
    constructor(
        private readonly emailQueueService: EmailQueueService,
        private readonly emailService: EmailService,
    ) {}

    @Post('send')
    async sendEmail(@Body() body: SendMailDto) {
        try {
            const { to, subject, text, html } = body;
            await this.emailQueueService.queueEmail(to, subject, text, html);
            return { message: 'Email sent successfully!' };
        } catch (error) {
            throw new HttpException('Failed to queue email', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('confirm')
    async sendOrderConfirmation(@Body() orderData: UserCreationOrderConfirmDto) {
        try {
            await this.emailQueueService.queueTemplateEmail(orderData);
            return { message: 'Order confirmation mail sent successfully' };
        } catch (error) {
            throw new HttpException('Failed to send order confirmation', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @Post('pwd-reset')
    // async sendPasswordReset(@Body() orderData: PasswordResetDto) {
    //     try {
    //         await this.emailQueueService.queueTemplateEmail(orderData);
    //         return { message: 'Order confirmation mail sent successfully' };
    //     } catch (error) {
    //         throw new HttpException('Failed to send order confirmation', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
