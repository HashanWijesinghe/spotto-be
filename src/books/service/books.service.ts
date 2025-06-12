import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../repository/books.repository';
import { Book } from '../models/book.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { BookNotFoundError } from '../errors/book-not-found.error';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { filterEmptyFields } from 'src/shared/utils/filter-empty-fields.util';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  getAllBooks(): Book[] {
    return this.booksRepository.findAll();
  }

  createBook(book: CreateBookDto): Book {
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

    const updatedData = {
      ...existingBook,
      ...filterEmptyFields(updatedBook),
      publishedDate: updatedBook.publishedDate
        ? new Date(updatedBook.publishedDate)
        : existingBook.publishedDate,
    };

    return this.booksRepository.update(id, updatedData);
  }

  clearBooks(): void {
    this.booksRepository.clear();
  }
}
