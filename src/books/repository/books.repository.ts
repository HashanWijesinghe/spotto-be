import { Injectable } from '@nestjs/common';
import { Book } from '../models/book.entity';
import { CreateBookDto } from '../dtos/create-book.dto';

@Injectable()
export class BooksRepository {
  private books: Book[] = [];
  private nextId = 1; // To avoid any duplicate IDs

  findAll(searchTerm?: string): Book[] {
    if (searchTerm) {
      return this.books.filter((book) =>
        [book.title, book.author, book.genre].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }
    return this.books;
  }

  findById(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  create(book: CreateBookDto): Book {
    const newBook: Book = {
      ...book,
      id: this.nextId++, // Simple id generation
      publishedDate: new Date(book.publishedDate),
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, updatedBook: Book): Book | undefined {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) return undefined;
    this.books[index] = updatedBook;
    return this.books[index];
  }

  delete(id: number): boolean {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) return false;
    this.books.splice(index, 1);
    return true;
  }

  clear(): void {
    this.books = [];
  }
}
