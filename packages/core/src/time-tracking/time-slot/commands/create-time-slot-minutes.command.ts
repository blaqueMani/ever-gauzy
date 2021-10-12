import { ICommand } from '@nestjs/cqrs';
import { ITimeSlotMinute } from '@leano/contracts';

export class CreateTimeSlotMinutesCommand implements ICommand {
	static readonly type = '[TimeSlotMinutes] create';

	constructor(public readonly input: ITimeSlotMinute) {}
}
