import { IInviteAcceptInput, LanguagesEnum } from '@leano/contracts';
import { ICommand } from '@nestjs/cqrs';

export class InviteAcceptEmployeeCommand implements ICommand {
	static readonly type = '[Invite] Accept Employee';

	constructor(
		public readonly input: IInviteAcceptInput,
		public readonly languageCode: LanguagesEnum
	) {}
}
