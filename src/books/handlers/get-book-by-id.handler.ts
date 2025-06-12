import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBookByIdQuery } from '../queries/get-book-by-id.query';
import { BooksService } from '../service/books.service';
import { Book } from '../models/book.entity';
import { BookNotFoundError } from '../errors/book-not-found.error';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetBookByIdQuery)
export class GetBookByIdQueryHandler
  implements IQueryHandler<GetBookByIdQuery>
{
  constructor(private readonly booksService: BooksService) {}

  // adding async to the execute method so that it can return a Promise without unnecessary promise wrapping
  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(query: GetBookByIdQuery): Promise<Book | undefined> {
    try {
      const book = this.booksService.getBookById(query.id);
      return book;
    } catch (error) {
      if (error instanceof BookNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
