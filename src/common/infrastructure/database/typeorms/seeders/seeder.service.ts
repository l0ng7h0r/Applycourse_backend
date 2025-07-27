import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UsersSeeder } from './user.seed';
import { ITransactionManager } from 'src/common/infrastructure/transaction/transaction.interface';
import { TRANSACTION_MANAGER_SERVICE } from 'src/common/constants/inject-key';
import { StudentOrmEntity } from '../entities/student.orm';
import { UserOrmEntity } from '../entities/user.orm';

@Injectable()
export class SeederService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @Inject(TRANSACTION_MANAGER_SERVICE)
    private readonly transactionManagerService: ITransactionManager,
    @Inject() private _userSeeder: UsersSeeder,
  ) {}

  async seed() {
    try {
      await this.transactionManagerService.runInTransaction(
        this.dataSource,
        async (manager) => {
          await this._userSeeder.seed(manager);
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  
}