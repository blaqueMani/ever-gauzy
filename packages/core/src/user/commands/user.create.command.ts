import { ICommand } from '@nestjs/cqrs';
import { IUserCreateInput } from '@leano/contracts';

export class UserCreateCommand implements ICommand {
	static readonly type = '[User] Register';

	constructor(public readonly input: IUserCreateInput) {}
}
