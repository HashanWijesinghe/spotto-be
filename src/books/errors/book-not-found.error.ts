export class BookNotFoundError extends Error {
  constructor(bookId: number) {
    super(`Book with ID ${bookId} not found`);
    this.name = 'BookNotFoundError';
  }
}
