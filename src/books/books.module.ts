import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BooksController } from './controller/books.controller';
import { BooksRepository } from './repository/books.repository';
import { GetAllBooksQueryHandler } from './handlers/getAllBooks.handler';
import { BooksService } from './service/books.service';
import { CreateBookCommandHandler } from './handlers/createBook.handler';

const queryHandlers = [GetAllBooksQueryHandler];
const commandHandlers = [CreateBookCommandHandler];

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
