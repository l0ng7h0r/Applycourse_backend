import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { UserOrmEntity } from './common/infrastructure/database/typeorms/entities/user.orm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserOrmEntity)
    private _UserRepo: Repository<UserOrmEntity>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getUser(user: any): Promise<UserOrmEntity> {
    const userEntity = await this._UserRepo.findOne({
      where: { id: user.id },
    });
    if (!userEntity) {
      throw new NotFoundException('User not found');
    }
    return userEntity;
  }

  async getUsers(user: any): Promise<UserOrmEntity[]> {
    const users = await this._UserRepo.find();
    if(!users || users.length==0) {
      throw new NotFoundException('not found')
    }
    return users;
  }
  
}
