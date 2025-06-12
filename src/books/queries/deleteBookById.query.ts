/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DetBookByIdQuery {
  @ApiProperty()
  @IsNumber()
  id: number;
}
