import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCommand } from '../commands/create-book.command';
import { BooksService } from '../service/books.service';
import { Book } from '../models/book.entity';

@CommandHandler(CreateBookCommand)
export class CreateBookCommandHandler
  implements ICommandHandler<CreateBookCommand>
{
  constructor(private readonly booksService: BooksService) {}

  execute(command: CreateBookCommand): Promise<Book> {
    return Promise.resolve(this.booksService.createBook(command));
  }
}
