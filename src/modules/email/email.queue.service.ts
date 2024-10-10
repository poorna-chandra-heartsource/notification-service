import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { IUserCreationOrderConfirmTemplateMail } from './interfaces/email.interface';

@Injectable()
export class EmailQueueService {
    constructor(@InjectQueue('emailQueue') private emailQueue: Queue) {}

    async queueEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
        await this.emailQueue.add('sendEmail', { to, subject, text, html }, {
            attempts: 3, // Retry failed emails up to 3 times
            backoff: 5000, // Wait 5 seconds before retrying
        });
    }

    async queueTemplateEmail(data: any): Promise<void> {
        await this.emailQueue.add('sendTemplateEmail', data, {
            attempts: 3, // Retry failed emails up to 3 times
            backoff: 5000, // Wait 5 seconds before retrying
        });
    }
}
