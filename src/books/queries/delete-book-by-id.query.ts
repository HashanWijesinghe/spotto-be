import { IsNumber } from 'class-validator';

export class DetBookByIdQuery {
  @IsNumber()
  id: number;
}
