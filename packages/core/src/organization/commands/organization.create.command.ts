import { IOrganizationCreateInput } from '@leano/contracts';
import { ICommand } from '@nestjs/cqrs';

export class OrganizationCreateCommand implements ICommand {
	static readonly type = '[Organization] Register';

	constructor(public readonly input: IOrganizationCreateInput) {}
}
