import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBookCommand } from '../commands/delete-book.command';
import { BooksService } from '../service/books.service';
import { BookNotFoundError } from '../errors/book-not-found.error';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteBookCommand)
export class DeleteBookCommandHandler
  implements ICommandHandler<DeleteBookCommand>
{
  constructor(private readonly booksService: BooksService) {}

  // adding async to the execute method so that it can return a Promise without unnecessary promise wrapping
  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(command: DeleteBookCommand): Promise<void> {
    try {
      this.booksService.deleteBookById(command.id);
    } catch (error) {
      if (error instanceof BookNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
