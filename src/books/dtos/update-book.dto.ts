import { Exclude } from 'class-transformer';
import { IsDateString, IsOptional, IsString, Validate } from 'class-validator';
import { HasAtLeastOnePropertyValidator } from '../../shared/validators/has-at-least-one-property.validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  publishedDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  genre?: string;

  @Exclude()
  @IsOptional()
  @Validate(HasAtLeastOnePropertyValidator)
  _validateAtLeastOneProperty?: boolean; // This property is used to trigger the custom validation
}
