import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../repository/books.repository';
import { Book } from '../models/book.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { BookNotFoundError } from '../errors/book-not-found.error';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { publish } from 'rxjs';
import { filterEmptyFields } from 'src/shared/utils/filter-empty-fields.util';

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

  getBookById(id: number): Book | undefined {
    const book = this.booksRepository.findById(id);
    if (!book) {
      throw new BookNotFoundError(id);
    }
    return book;
  }

  deleteBookById(id: number): boolean {
    const deleted = this.booksRepository.delete(id);
    if (!deleted) {
      throw new BookNotFoundError(id);
    }
    return deleted;
  }

  updateBook(id: number, updatedBook: UpdateBookDto): Book | undefined {
    const existingBook = this.booksRepository.findById(id);
    if (!existingBook) {
      throw new BookNotFoundError(id);
    }
    console.log(
      'Books service called to update a book',
      updatedBook,
      existingBook,
    );
    const updatedData = {
      ...existingBook,
      ...filterEmptyFields(updatedBook),
      publishedDate: updatedBook.publishedDate
        ? new Date(updatedBook.publishedDate)
        : existingBook.publishedDate,
    };
    console.log('updated data:', updatedData);
    return this.booksRepository.update(id, updatedData);
  }

  clearBooks(): void {
    console.log('Books service called to clear all books');
    this.booksRepository.clear();
  }
}
