import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBookCommand } from '../commands/update-book.command';
import { BookNotFoundError } from '../errors/book-not-found.error';
import { BooksService } from '../service/books.service';
import { NotFoundException } from '@nestjs/common';
import { Book } from '../models/book.entity';

@CommandHandler(UpdateBookCommand)
export class UpdateBookCommandHandler
  implements ICommandHandler<UpdateBookCommand>
{
  constructor(private readonly booksService: BooksService) {}

  // adding async to the execute method so that it can return a Promise without unnecessary promise wrapping
  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(command: UpdateBookCommand): Promise<Book | undefined> {
    try {
      return this.booksService.updateBook(command.id, command.data);
    } catch (error) {
      if (error instanceof BookNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
