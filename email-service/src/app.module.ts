import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { SModule } from './co/s/s.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [EmailModule, SModule],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
