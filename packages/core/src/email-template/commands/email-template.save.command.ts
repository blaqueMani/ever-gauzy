import { ICommand } from '@nestjs/cqrs';
import { IEmailTemplateSaveInput } from '@leano/contracts';

export class EmailTemplateSaveCommand implements ICommand {
	static readonly type = '[EmailTemplate] Save';

	constructor(public readonly input: IEmailTemplateSaveInput) {}
}
