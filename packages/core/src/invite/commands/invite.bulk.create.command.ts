import { ICommand } from '@nestjs/cqrs';
import { ICreateEmailInvitesInput, LanguagesEnum } from '@leano/contracts';
import { Request } from 'express';

export class InviteBulkCreateCommand implements ICommand {
	static readonly type = '[Invite Bulk] Create';

	constructor(
        public readonly input: ICreateEmailInvitesInput,
        public readonly request: Request,
        public readonly languageCode: LanguagesEnum
    ) {}
}
