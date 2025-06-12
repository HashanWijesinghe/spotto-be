import { Exclude } from 'class-transformer';
import { IsDateString, IsOptional, IsString, Validate } from 'class-validator';
import { HasAtLeastOnePropertyValidator } from 'src/shared/validators/has-at-least-one-property.validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsDateString()
  @IsOptional()
  publishedDate?: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @Exclude()
  @Validate(HasAtLeastOnePropertyValidator)
  _validateAtLeastOneProperty: boolean; // This property is used to trigger the custom validation
}
