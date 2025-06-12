import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotEmptyObject, IsNumber } from 'class-validator';
import { UpdateBookDto } from '../dtos/update-book.dto';

export class UpdateBookCommand {
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmptyObject()
  data: UpdateBookDto;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // title?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // author?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsDateString()
  // publishedDate?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // genre?: string;
}
