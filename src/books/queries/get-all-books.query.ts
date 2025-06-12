import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetAllBooksQuery {
  @IsString()
  @IsOptional()
  @ApiProperty()
  searchTerm?: string;
}
