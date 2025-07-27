export interface IPagination<T> {
    total: number;
    count: number;
    limit: number;
    totalPages: number;
    currentPage: number;
}