import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCommand } from '../commands/create-book.command';
import { BooksService } from '../service/books.service';
import { Book } from '../models/book.entity';

@CommandHandler(CreateBookCommand)
export class CreateBookCommandHandler
  implements ICommandHandler<CreateBookCommand>
{
  constructor(private readonly booksService: BooksService) {}

  // adding async to the execute method so that it can return a Promise without unnecessary promise wrapping
  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(command: CreateBookCommand): Promise<Book> {
    return this.booksService.createBook(command);
  }
}
