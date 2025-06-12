import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllBooksQuery } from '../queries/get-all-books.query';
import { Book } from '../models/book.entity';
import { CreateBookCommand } from '../commands/create-book.command';
import { GetBookByIdParam } from '../dtos/get-book-by-id-param.dto';
import { GetBookByIdQuery } from '../queries/get-book-by-id.query';
import { DeleteBookByIdParam } from '../dtos/delete-book-by-id-param.dto';
import { DeleteBookCommand } from '../commands/delete-book.command';
import { UpdateBookByIdParam } from '../dtos/update-book-by-id-param.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { UpdateBookCommand } from '../commands/update-book.command';
import { SearchBooksDto } from '../dtos/search-books.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Get all books' })
  @Get()
  getBooks(@Query() query: SearchBooksDto): Promise<Book[]> {
    const getAllBooksQuery = new GetAllBooksQuery();
    getAllBooksQuery.searchTerm = query?.searchTerm;
    return this.queryBus.execute(getAllBooksQuery);
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
  DeleteBook(@Param() params: DeleteBookByIdParam): Promise<void> {
    const deleteCommand = new DeleteBookCommand();
    deleteCommand.id = params.id;
    return this.commandBus.execute(deleteCommand);
  }

  @Patch(':id')
  UpdateBook(
    @Param() params: UpdateBookByIdParam,
    @Body() dto: UpdateBookDto,
  ): Promise<Book | undefined> {
    const updateCommand = new UpdateBookCommand();
    updateCommand.id = params.id;
    updateCommand.data = dto;
    return this.commandBus.execute(updateCommand);
  }
}
