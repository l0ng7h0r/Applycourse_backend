import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import moment from 'moment-timezone';
import { UserOrmEntity } from '../entities/user.orm';
import { Timezone } from 'src/common/object-value/time-zone.vo';
import { DateFormat } from 'src/common/object-value/format-date.vo';
import { hashPassword } from 'src/common/utils/hash-password';

@Injectable()
export class UsersSeeder {
  private readonly SEEDER_NAME = 'user_seeders';

  constructor() {}

  async seed(manager: EntityManager) {
    const _respository = manager.getRepository(UserOrmEntity);
    // const currentDateTime = moment
    //   .tz(Timezone.LAOS)
    //   .format(DateFormat.DATETIME_FORMAT);
    const now = new Date();
    const currentDateTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    const items = [
      {
        username: 'super admin',
        email: 'super_admin@gmail.com',
        password: await hashPassword('super@1234'),
        created_at: currentDateTime,
        updated_at: currentDateTime,
      },
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: await hashPassword('admin@1234'),
        created_at: currentDateTime,
        updated_at: currentDateTime,
      },
      {
        username: 'user',
        email: 'user@gmail.com',
        password: await hashPassword('user@1234'),
        created_at: currentDateTime,
        updated_at: currentDateTime,
      },
    ];

    for (const item of items) {
      const existingItem = await _respository.findOne({
        where: { email: item.email },
      });
      if (!existingItem) {
        const items = _respository.create(item);
        await _respository.save(items);
      }
    }
  }
}