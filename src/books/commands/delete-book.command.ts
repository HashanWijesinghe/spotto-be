import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteBookCommand {
  @ApiProperty()
  @IsNumber()
  id: number;
}
