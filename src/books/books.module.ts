import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BooksController } from './controller/books.controller';
import { BooksRepository } from './repository/books.repository';
import { GetAllBooksQueryHandler } from './handlers/get-all-books.handler';
import { BooksService } from './service/books.service';
import { CreateBookCommandHandler } from './handlers/create-book.handler';
import { GetBookByIdQueryHandler } from './handlers/get-book-by-id.handler';
import { DeleteBookCommandHandler } from './handlers/delete-book.handler';
import { UpdateBookCommandHandler } from './handlers/update-book.handler';

const queryHandlers = [GetAllBooksQueryHandler, GetBookByIdQueryHandler];
const commandHandlers = [
  CreateBookCommandHandler,
  DeleteBookCommandHandler,
  UpdateBookCommandHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [BooksController],
  providers: [
    BooksRepository,
    BooksService,
    ...queryHandlers,
    ...commandHandlers,
  ],
})
export class BooksModule {}
