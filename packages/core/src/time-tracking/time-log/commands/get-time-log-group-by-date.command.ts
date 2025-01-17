import { ITimeLog } from '@leano/contracts';
import { ICommand } from '@nestjs/cqrs';

export class GetTimeLogGroupByDateCommand implements ICommand {
	static readonly type = '[TimeLog] group by date';

	constructor(public readonly timeLogs: ITimeLog[]) {}
}
