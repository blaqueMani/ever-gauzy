import { ICommand } from '@nestjs/cqrs';
import { ICandidateTechnologies } from '@leano/contracts';

export class CandidateTechnologiesBulkDeleteCommand implements ICommand {
	static readonly type = '[CandidateTechnologies] Delete';

	constructor(
		public readonly id: string,
		public readonly technologies?: ICandidateTechnologies[]
	) {}
}
