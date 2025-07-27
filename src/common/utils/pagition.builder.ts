import { SelectQueryBuilder } from 'typeorm';
import { PaginatedResponse } from '../pagination/respone.pagination';
import { IPagination } from '../pagination/pagination.interface';

export async function paginateQueryBuilder<
  T extends import('typeorm').ObjectLiteral,
>(
  queryBuilder: SelectQueryBuilder<T>,
  page = 1,
  limit = 10,
): Promise<PaginatedResponse<T>> {
  const skip = (page - 1) * limit;

  const [items, total] = await queryBuilder
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  const pagination: IPagination<T> = {
    total,
    count: items.length,
    limit,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };

  return { data: items, pagination };
}