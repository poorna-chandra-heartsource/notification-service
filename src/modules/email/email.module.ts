import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailService } from './email.service';
import { EmailProcessor } from './email.processor';
import { EmailQueueService } from './email.queue.service';
import { EmailController } from './email.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [EmailService, EmailProcessor, EmailQueueService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
