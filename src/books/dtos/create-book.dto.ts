import { IsDateString, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsDateString()
  publishedDate: string;

  @IsString()
  genre: string;
}
