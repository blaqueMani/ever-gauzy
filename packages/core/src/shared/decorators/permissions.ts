import { SetMetadata, createParamDecorator } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { PermissionsEnum } from '@leano/contracts';
import { environment as env } from '@leano/config';
import { RequestContext } from '../../core/context';

export const Permissions = (...permissions: string[]) =>
	SetMetadata('permissions', permissions);

export const UserPermissions = createParamDecorator((): PermissionsEnum[] => {
	const token = RequestContext.currentToken();

	const { permissions } = verify(token, env.JWT_SECRET) as {
		id: string;
		permissions: PermissionsEnum[];
	};

	return permissions.map((permission) => PermissionsEnum[permission]);
});
