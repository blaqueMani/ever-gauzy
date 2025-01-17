import { ICommand } from '@nestjs/cqrs';
import { ITenant } from '@leano/contracts';

export class TenantFeatureOrganizationCreateCommand implements ICommand {
	static readonly type = '[Tenant] Feature Organization Create';

	constructor(public readonly input: ITenant[]) {}
}
