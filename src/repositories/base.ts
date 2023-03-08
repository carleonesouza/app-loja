export type FilterOptions = Record<string, unknown>;

export type WithId<T> = { id: string } & T;

export interface BaseRepository<T> {
  create(data: T): Promise<WithId<T>>;
  findOne(options: FilterOptions): Promise<WithId<T> | undefined>;
  find(options: FilterOptions): Promise<WithId<T>[]>;
  deleteOne(options: FilterOptions): Promise<void>;
}
