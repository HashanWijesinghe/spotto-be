import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBookCommand } from '../commands/update-book.command';
import { BookNotFoundError } from '../errors/book-not-found.error';
import { BooksService } from '../service/books.service';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateBookCommand)
export class UpdateBookCommandHandler
  implements ICommandHandler<UpdateBookCommand>
{
  constructor(private readonly booksService: BooksService) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(command: UpdateBookCommand): Promise<any> {
    try {
      this.booksService.updateBook(command.id, command.data);
    } catch (error) {
      if (error instanceof BookNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
