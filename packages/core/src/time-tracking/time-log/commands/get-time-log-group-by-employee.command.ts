import { ITimeLog } from '@leano/contracts';
import { ICommand } from '@nestjs/cqrs';

export class GetTimeLogGroupByEmployeeCommand implements ICommand {
	static readonly type = '[TimeLog] group by employee';

	constructor(public readonly timeLogs: ITimeLog[]) {}
}
