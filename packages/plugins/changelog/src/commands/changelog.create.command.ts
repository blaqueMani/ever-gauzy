import { IChangelogCreateInput } from '@leano/contracts';
import { ICommand } from '@nestjs/cqrs';

export class ChangelogCreateCommand implements ICommand {
	static readonly type = '[Changelog] Create';

	constructor(public readonly input: IChangelogCreateInput) {}
}
