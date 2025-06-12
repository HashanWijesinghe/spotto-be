import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllBooksQuery } from '../queries/getAllBooks.query';
import { Book } from '../models/book.entity';
import { CreateBookCommand } from '../commands/create-book.command';
import { GetBookByIdParam } from '../dtos/get-book-by-id-param.dto';
import { GetBookByIdQuery } from '../queries/getBookById.query';
import { BookNotFoundError } from '../errors/book-not-found.error';
import { DeleteBookByIdParam } from '../dtos/delete-book-by-id-param.dto';
import { DeleteBookCommand } from '../commands/delete-book.command';
import { UpdateBookByIdParam } from '../dtos/update-book-by-id-param.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { UpdateBookCommand } from '../commands/update-book.command';

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
  getBookById(@Param() params: GetBookByIdParam): Promise<Book | undefined> {
    const query = new GetBookByIdQuery();
    query.id = params.id;
    return this.queryBus.execute(query);
  }

  @Post()
  CreateBook(@Body() command: CreateBookCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  DeleteBook(@Param() params: DeleteBookByIdParam): Promise<any> {
    const deleteCommand = new DeleteBookCommand();
    deleteCommand.id = params.id;
    return this.commandBus.execute(deleteCommand);
  }

  @Patch(':id')
  UpdateBook(
    @Param() params: UpdateBookByIdParam,
    @Body() dto: UpdateBookDto,
  ): Promise<any> {
    const updateCommand = new UpdateBookCommand();
    updateCommand.id = params.id;
    updateCommand.data = dto;
    return this.commandBus.execute(updateCommand);
  }
}
