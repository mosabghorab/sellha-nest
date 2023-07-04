import { PermissionAction } from '../../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../../permissions/enums/permission-group-enum';
import { SetMetadata } from '@nestjs/common';

export const STRICT_KEY = 'strict';

export const Strict = (data: {
  permissionAction: PermissionAction;
  permissionGroup: PermissionGroup;
}) => SetMetadata(STRICT_KEY, data);
