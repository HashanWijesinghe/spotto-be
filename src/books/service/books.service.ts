import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../repository/books.repository';
import { Book } from '../models/book.entity';
import { CreateBookDto } from '../dtos/createBook.dto';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  getAllBooks(): Book[] {
    console.log('Books servuce called to get all books');
    return this.booksRepository.findAll();
  }

  createBook(book: CreateBookDto): Book {
    console.log('Books service called to create a book', book);
    return this.booksRepository.create(book);
  }
}
