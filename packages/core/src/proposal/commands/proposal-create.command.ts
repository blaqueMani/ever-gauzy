import { ICommand } from '@nestjs/cqrs';
import { IProposalCreateInput } from '@leano/contracts';

export class ProposalCreateCommand implements ICommand {
	static readonly type = '[Proposal] Create Proposal';

	constructor(public readonly input: IProposalCreateInput) {}
}
