import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { ITransactionManager } from './transaction.interface';

@Injectable()
export class TransactionManagerService implements ITransactionManager {
  /**
   * Runs a given operation inside a transaction using the provided DataSource.
   * @param dataSource The DataSource to use for the transaction.
   * @param operations A function that takes an EntityManager and performs operations inside the transaction.
   * @returns A promise that resolves to the value returned by the operations function.
   */
  async runInTransaction<T>(
    dataSource: DataSource,
    operations: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await operations(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}