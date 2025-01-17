import { IApprovalPolicyCreateInput } from '@leano/contracts';
import { ICommand } from '@nestjs/cqrs';

export class ApprovalPolicyCreateCommand implements ICommand {
	static readonly type = '[ApprovalPolicy] Create';

	constructor(public readonly input: IApprovalPolicyCreateInput) {}
}
