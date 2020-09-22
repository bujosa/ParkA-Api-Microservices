import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './credential/credential.entity';
import { CreateUserDto } from './userData/create-user.dto';
import { User } from './userData/user.entity';
import { v4 as uuid } from 'uuid';
import { RpcException } from '@nestjs/microservices';
import { UpdateUserDto } from './userData/update-user.dto';
import { AuthCredentialsDto } from './userData/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}

  // Is Inprogress
  public async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.debug(
      `Received create user payload ${JSON.stringify(updateUserDto)}`,
    );
    const { name, email, lastName, profilePicture } = updateUserDto;

    var date = new Date();
    try {
      const user = this.authRepository.save({
        id: uuid(),
        name,
        lastName,
        email,
        profilePicture,
        updateAt: date.getTime(),
      });

      return await user;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  // Is Inprogress
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.debug(
      `Received create user payload ${JSON.stringify(createUserDto)}`,
    );
    var { name, email, lastName, profilePicture, password } = createUserDto;

    var date = new Date();

    try {
      const salt = await bcrypt.genSalt();
      password = await this.hashPassword(password, salt);
      const id = uuid();

      var result = this.credentialRepository.save({
        id,
        email,
        password,
        salt,
        createAt: date.toTimeString(),
        updateAt: date.toTimeString(),
      });

      this.logger.debug(
        `Received create user payload ${JSON.stringify(result)}`,
      );
      const id2 = id;

      const user = this.authRepository.save({
        id: uuid(),
        name,
        lastName,
        email,
        profilePicture,
        createAt: date.toTimeString(),
        updateAt: date.toTimeString(),
        confirmed: false,
        credential: id2,
      });

      return await user;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public async getAllUser(): Promise<User[]> {
    try {
      const user = this.authRepository.find();
      return await user;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUser(id: string): Promise<User> {
    const user = this.authRepository.findOne({ id });
    return await user;
  }

  // Is Inprogress
  public async signIn(authCrendetialsDto: AuthCredentialsDto) {
    const { email, password } = authCrendetialsDto;

    const user = new User();

    user.email = email;
    user.password = password;
  }
}
