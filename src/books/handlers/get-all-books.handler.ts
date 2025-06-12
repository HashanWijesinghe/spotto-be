import { BooksService } from '../service/books.service';
import { GetAllBooksQuery } from '../queries/getAllBooks.query';
import { Book } from '../models/book.entity';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllBooksQuery)
export class GetAllBooksQueryHandler
  implements IQueryHandler<GetAllBooksQuery>
{
  constructor(private readonly booksService: BooksService) {}

  async execute(): Promise<Book[]> {
    return Promise.resolve(this.booksService.getAllBooks());
  }
}
