import { ICommand } from '@nestjs/cqrs';
import { IOrganizationContactCreateInput } from '@leano/contracts';

export class OrganizationContactCreateCommand implements ICommand {
	static readonly type = '[OrganizationContact] Create Organization Contact';

	constructor(public readonly input: IOrganizationContactCreateInput) {}
}
