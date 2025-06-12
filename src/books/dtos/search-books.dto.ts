import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchBooksDto {
  @ApiPropertyOptional({
    description: 'Search term to filter books by title, author and genre',
  })
  @IsOptional()
  @IsString()
  searchTerm?: string;
}
