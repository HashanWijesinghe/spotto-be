import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'HasAtLeastOneProperty', async: false })
export class HasAtLeastOnePropertyValidator
  implements ValidatorConstraintInterface
{
  validate(_: any, args: ValidationArguments): boolean {
    const object = args.object as Record<string, any>;
    return Object.keys(object).some((key) => object[key] !== undefined);
  }

  defaultMessage(): string {
    return 'At least one property must be defined';
  }
}
