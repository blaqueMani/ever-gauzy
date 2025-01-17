import { ICommand } from '@nestjs/cqrs';
import { IIntegrationTenantCreateDto } from '@leano/contracts';

export class IntegrationTenantCreateCommand implements ICommand {
	static readonly type = '[Integration] Create Integration';

	constructor(public readonly input: IIntegrationTenantCreateDto) {}
}
