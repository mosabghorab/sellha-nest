import { BadRequestException, ValidationError } from '@nestjs/common';
import { validate } from 'class-validator';
import { randomBytes } from 'crypto';
import * as fs from 'fs-extra';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { UsersRoles } from '../users-roles/entities/users-roles.entity';
import { UploadImageDto } from './dtos/upload-image-dto';

export const extractTokenFromHeader = (
  request: Request,
): string | undefined => {
  const [type, token] = request.headers['authorization']?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

export const extractErrorMessages = (errors: ValidationError[]): string[] => {
  let errorMessages: string[] = [];
  for (const error of errors) {
    if (error.constraints) {
      const constraints = Object.values(error.constraints);
      errorMessages = errorMessages.concat(constraints);
    }
    if (error.children && error.children.length > 0) {
      const childErrorMessages = extractErrorMessages(error.children);
      errorMessages = errorMessages.concat(childErrorMessages);
    }
  }
  return errorMessages;
};

export const validateDto = async (dto: any) => {
  const errors = await validate(dto);
  if (errors.length > 0) {
    throw new BadRequestException(extractErrorMessages(errors));
  }
  return true;
};

export const generateUniqueFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = randomBytes(8).toString('hex');
  const fileExtension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${fileExtension}`;
};

export const saveFile = async (
  filepath: string,
  filename: string,
  file: UploadImageDto,
): Promise<boolean> => {
  await fs.ensureDir(filepath);
  await file.mv(filepath + filename);
  return true;
};

export const can = (
  action: PermissionAction,
  group: PermissionGroup,
  usersRoles: UsersRoles[],
) => {
  return usersRoles.some((e) =>
    e.role.rolesPermissions.some(
      (p) => p.permission.action === action && p.permission.group === group,
    ),
  );
};
