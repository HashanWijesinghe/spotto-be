import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksRepository } from '../repository/books.repository';

const mockBook = {
  title: 'Test Book',
  author: 'Author',
  publishedDate: '2000-01-01',
  genre: 'Test Genre',
};

describe('BooksService', () => {
  let service: BooksService;
  let repository: BooksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: BooksRepository,
          useValue: new BooksRepository(), // Using a real instance for simplicity
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<BooksRepository>(BooksRepository);

    repository.clear(); // Clear the repository before each test
    service.createBook(mockBook); // Pre-populate with a book for testing
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', () => {
    const book = service.createBook({
      ...mockBook,
      title: 'This is my test book',
    });

    expect(book).toHaveProperty('id');
    expect(book.title).toBe('This is my test book');
  });

  it('should get all books', () => {
    const books = service.getAllBooks();
    expect(Array.isArray(books)).toBe(true);
  });

  it('should get all books matching searchTerm', () => {
    service.createBook({
      ...mockBook,
      title: 'This is my test book',
    });
    const books = service.getAllBooks('This is my test book');
    expect(books).toHaveLength(1);
    expect(Array.isArray(books)).toBe(true);
  });

  it('should get a book by ID', () => {
    const foundBook = service.getBookById(1);
    expect(foundBook).toBeDefined();
    expect(foundBook?.id).toBe(1);
    expect(foundBook?.title).toBe('Test Book');
  });

  it('should throw BookNotFoundError if book not found', () => {
    expect(() => service.getBookById(99)).toThrow('Book with ID 99 not found');
  });

  it('should delete a book by ID', () => {
    const deleted = service.deleteBookById(1);
    expect(deleted).toBe(true);
  });

  it('should throw BookNotFoundError if book to delete not found', () => {
    expect(() => service.deleteBookById(99)).toThrow(
      'Book with ID 99 not found',
    );
  });

  it('should update a book', () => {
    const updatedBook = { ...mockBook, title: 'Updated Book' };
    const result = service.updateBook(1, updatedBook);
    expect(result).toBeDefined();
    expect(result?.title).toBe('Updated Book');
  });

  it('should throw BookNotFoundError if book to update not found', () => {
    expect(() => service.updateBook(99, mockBook)).toThrow(
      'Book with ID 99 not found',
    );
  });
});
