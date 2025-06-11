import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  @ApiOperation({ summary: 'Get all books' })
  @Get()
  getBooks() {
    console.log('Fetching all books');
    return [
      { id: 1, title: '1984', author: 'George Orwell' },
      { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
      { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    ];
  }

  @Get(':id')
  getBookById(): string {
    return 'Book details for the given ID';
  }

  @Post()
  CreateBook(): string {
    return 'Book created successfully';
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
