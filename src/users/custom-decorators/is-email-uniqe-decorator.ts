// import {
//     registerDecorator,
//     ValidationOptions,
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
//     ValidationArguments,
//   } from 'class-validator';
// import { UsersService } from '../users.service';
  
//   @ValidatorConstraint({ async: true })
//   export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
//     constructor(private readonly usersService: UsersService) { }
  
//     async validate(email: string, _args: ValidationArguments): Promise<boolean> {
//       const user = await this.usersService.findByEmail(email);
//       return !user;
//     }
  
//     defaultMessage(): string {
//       return 'Email already exists.';
//     }
//   }

//   export function IsEmailUnique(validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string): void {
//       registerDecorator({
//         target: object.constructor,
//         propertyName,
//         options: validationOptions,
//         constraints: [],
//         validator: IsEmailUniqueConstraint,
//       });
//     };
//   }