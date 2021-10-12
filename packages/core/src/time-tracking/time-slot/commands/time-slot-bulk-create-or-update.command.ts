import { ICommand } from '@nestjs/cqrs';
import { ITimeSlot } from '@leano/contracts';

export class TimeSlotBulkCreateOrUpdateCommand implements ICommand {
	static readonly type = '[TimeSlot] bulk create / update';

	constructor(public readonly slots: ITimeSlot[]) {}
}
