import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRegisterCommand } from '../auth.register.command';
import { AuthService } from '../../auth.service';
import { IUser, RolesEnum } from '@leano/contracts';
import { UserService } from '../../../user/user.service';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

@CommandHandler(AuthRegisterCommand)
export class AuthRegisterHandler
	implements ICommandHandler<AuthRegisterCommand> {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService
	) {}

	public async execute(command: AuthRegisterCommand): Promise<IUser> {
		const { input, languageCode } = command;
		if (
			input.user &&
			input.user.role &&
			input.user.role.name === RolesEnum.SUPER_ADMIN
		) {
			if (!input.createdById) {
				throw new BadRequestException()
			};

			const { role } = await this.userService.findOneByIdString(input.createdById, {
				relations: ['role']
			});

			if (role.name !== RolesEnum.SUPER_ADMIN) {
				throw new UnauthorizedException();
			}
		}
		return await this.authService.register(input, languageCode);
	}
}
