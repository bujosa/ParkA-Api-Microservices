import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConfirmEmailDto } from './dto/create-confirm-email.dto';
import { ConfirmEmail } from './entities/confirm-email.entity';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { RpcException } from '@nestjs/microservices';
import { promises } from 'dns';
import { sendEmail } from './utils/sendEmail';
import { exception } from 'console';

@Injectable()
export class EmailService {
  private logger = new Logger('EmailService');

  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    @InjectRepository(ConfirmEmail)
    private confirmEmailRepository: Repository<ConfirmEmail>,
  ) {}

  public async confirmEmail(
    createConfirmEmailDto: CreateConfirmEmailDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received create confirm email payload ${JSON.stringify(
        createConfirmEmailDto,
      )}`,
    );
    const { email, origin } = createConfirmEmailDto;

    const date = new Date();
    email.toLowerCase();

    try {
      const salt = await bcrypt.genSalt();
      const message = await this.generateCode(origin);
      const code = await this.hashCode(message, salt);

      const confirmEmail = this.confirmEmailRepository.save({
        id: uuid(),
        email,
        salt,
        origin,
        code,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
        completed: false,
      });

      await sendEmail(email, message, origin);
      return await confirmEmail;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  public async ResendEmail(
    createConfirmEmailDto: CreateConfirmEmailDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received resend confirm email payload ${JSON.stringify(
        createConfirmEmailDto,
      )}`,
    );

    const { email, origin } = createConfirmEmailDto;
    email.toLowerCase();

    try {
      const confirmEmail = await this.getConfirmEmail(email);
      confirmEmail.updatedAt = new Date().toISOString();
      confirmEmail.origin = origin;

      const salt = await bcrypt.genSalt();
      const message = await this.generateCode(origin);
      const code = await this.hashCode(message, salt);

      confirmEmail.code = code;
      confirmEmail.salt = salt;

      this.confirmEmailRepository.save(confirmEmail);

      await sendEmail(email, message, origin);

      return confirmEmail;
    } catch (error) {
      throw new RpcException('Invalid Process');
    }
  }

  public async getConfirmEmail(email: string): Promise<ConfirmEmail> {
    try {
      const confirm = await this.confirmEmailRepository.findOne(email);
      return await confirm;
    } catch (error) {
      throw new exception('Email dont exist');
    }
  }

  private async hashCode(code: string, salt: string): Promise<string> {
    return bcrypt.hash(code, salt);
  }

  private async generateCode(origin: string): Promise<string> {
    if (origin == 'mobile') {
      return (await this.getRandomInt()).toString();
    }
    return uuid();
  }

  private async getRandomInt(): Promise<number> {
    let result = 0;
    const min = 99999;
    const max = 1000000;
    do {
      result = Math.floor(Math.random() * Math.floor(max));
    } while (result < min && result > max);
    return result;
  }
}
