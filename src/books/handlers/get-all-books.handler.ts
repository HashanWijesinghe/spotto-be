import { BooksService } from '../service/books.service';
import { GetAllBooksQuery } from '../queries/get-all-books.query';
import { Book } from '../models/book.entity';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllBooksQuery)
export class GetAllBooksQueryHandler
  implements IQueryHandler<GetAllBooksQuery>
{
  constructor(private readonly booksService: BooksService) {}

  // adding async to the execute method so that it can return a Promise without unnecessary promise wrapping
  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(query: GetAllBooksQuery): Promise<Book[]> {
    return this.booksService.getAllBooks(query.searchTerm);
  }
}
