import { ICommand } from '@nestjs/cqrs';
import { IAuthLoginInput } from '@leano/contracts';

export class AuthLoginCommand implements ICommand {
	static readonly type = '[Auth] Login';

	constructor(public readonly input: IAuthLoginInput) {}
}
