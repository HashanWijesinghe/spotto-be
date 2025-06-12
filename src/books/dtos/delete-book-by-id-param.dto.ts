/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class DeleteBookByIdParam {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  id: number;
}
