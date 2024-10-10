import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { EmailService } from './email.service';

@Processor('emailQueue')
export class EmailProcessor {
    constructor(private readonly emailService: EmailService) {}

    @Process('sendEmail')
    async handleEmailJob(job: Job) {
        const { to, subject, text, html } = job.data;
        console.log(`Processing email job: ${job.id}`);
        await this.emailService.sendMail(to, subject, text, html);
    }

    @Process('sendTemplateEmail')
    async handleTemplateEmailJob(job: Job) {
        console.log(`Processing template email job: ${job.id}`);
        await this.emailService.sendTemplatedMail(job.data);
    }
}
