import { ICommand } from '@nestjs/cqrs';
import {
	AvailabilityMergeType,
	IAvailabilitySlotsCreateInput
} from '@leano/contracts';

export class AvailabilitySlotsCreateCommand implements ICommand {
	static readonly type = '[AvailabilitySlots] Create';

	constructor(
		public readonly input: IAvailabilitySlotsCreateInput,
		public readonly insertType: AvailabilityMergeType = AvailabilityMergeType.MERGE
	) {}
}
