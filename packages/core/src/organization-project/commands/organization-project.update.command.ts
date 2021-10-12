import { ICommand } from '@nestjs/cqrs';
import { IOrganizationProjectsUpdateInput } from '@leano/contracts';

export class OrganizationProjectUpdateCommand implements ICommand {
	static readonly type = '[OrganizationProject] Update Project';

	constructor(public readonly input: IOrganizationProjectsUpdateInput) {}
}
