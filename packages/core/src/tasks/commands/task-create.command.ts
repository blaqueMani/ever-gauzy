import { ICommand } from '@nestjs/cqrs';
import { ITaskCreateInput } from '@leano/contracts';

export class TaskCreateCommand implements ICommand {
	static readonly type = '[Tasks] Create Task';

	constructor(public readonly input: ITaskCreateInput) {}
}
