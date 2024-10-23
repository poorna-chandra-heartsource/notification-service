import { Injectable, Logger } from '@nestjs/common';
import * as handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as nodemailer from 'nodemailer';
import mailConfig from 'src/config/mail.config';
import { IUserCreationOrderConfirmTemplateMail } from './interfaces/email.interface';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private readonly templateCache: Map<string, handlebars.TemplateDelegate> = new Map();
    private readonly transporter;

    constructor() {
        // Create the transporter using the configuration
        this.transporter = nodemailer.createTransport({
            host: mailConfig().smtpHost,
            port: mailConfig().smtpPort,
            secure: mailConfig().smtpPort === 465, // Use secure connection for port 465
            auth: {
                user: mailConfig().smtpUser,
                pass: mailConfig().smtpPass,
            },
        });
    }



    // Method for sending an order confirmation email
    // async sendOrderEmail(data: IOrderConfirmTemplateMail): Promise<void> {
    //     const { to, subject, name, items, shippingAddress, passwordResetLink } = data;
    //     try {
    //         await this.sendTemplatedMail(to, subject, 'order-email', variables);
    //     } catch (error) {
    //         this.logger.error(`Error sending order email: ${error.message}`, error.stack);
    //         throw new Error('Failed to send order email');
    //     }
    // }

    // Method to send an email with an HTML template
    async sendTemplatedMail(data: any): Promise<void> {
        try {
            const html = this.renderTemplate(data.templateName, {...data});
            await this.sendMail(data.to, data.subject, '', html);
        } catch (error) {
            this.logger.error(`Failed to send templated email: ${error.message}`, error.stack);
            throw new Error('Failed to send templated email');
        }
    }

    // Render HTML using Handlebars template with caching
    private renderTemplate(templateName: string, variables: any): string {
        if (!this.templateCache.has(templateName)) {
            const basePath = join(process.cwd(), 'templates'); // Absolute path to root-level templates
            const templatePath = join(basePath, `${templateName}.hbs`);
            const templateSource = readFileSync(templatePath, 'utf-8');
            const template = handlebars.compile(templateSource);
            this.templateCache.set(templateName, template); // Cache compiled template
        }

        const compiledTemplate = this.templateCache.get(templateName);
        return compiledTemplate(variables);
    }

    // Method to send a plain or HTML email
    async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
        try {
            const fromEmail = mailConfig().fromEmail;
            const info = await this.transporter.sendMail({
                from: fromEmail,
                to,
                subject,
                text,
                html,
                bcc: ['anitha.she85@gmail.com','poorna.chandra@heartsource.co']
            });

            this.logger.log(`Message sent: ${info.messageId}`);
        } catch (error) {
            this.logger.error(`Error sending email: ${error.message}`, error.stack);
            throw new Error('Failed to send email');
        }
    }
}
