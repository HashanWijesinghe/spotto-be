import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllBooksQuery } from '../queries/getAllBooks.query';
import { Book } from '../models/book.entity';
import { CreateBookCommand } from '../commands/createBook.command';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Get all books' })
  @Get()
  getBooks(): Promise<Book[]> {
    return this.queryBus.execute(new GetAllBooksQuery());
  }

  @Get(':id')
  getBookById(): string {
    return 'Book details for the given ID';
  }

  @Post()
  CreateBook(@Body() command: CreateBookCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  DeleteBook(): string {
    return 'Book deleted successfully';
  }

  @Patch(':id')
  UpdateBook(): string {
    return 'Book updated successfully';
  }
}
