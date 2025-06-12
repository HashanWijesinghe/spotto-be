import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, IsNumber } from 'class-validator';
import { UpdateBookDto } from '../dtos/update-book.dto';

export class UpdateBookCommand {
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmptyObject()
  data: UpdateBookDto;
}
