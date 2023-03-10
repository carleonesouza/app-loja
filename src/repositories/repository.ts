export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class DatabaseValidationError extends DatabaseError {}

export class DatabaseUnknownClientError extends DatabaseError {}

export class DatabaseInternalError extends DatabaseError {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class Repository<T> {}
