import { ICommand } from '@nestjs/cqrs';
import { IOrganizationCreateInput } from '@leano/contracts';

export class GauzyCloudOrganizationMigrateCommand implements ICommand {
	static readonly type = '[Gauzy Cloud] Organization Migrate';

	constructor(
		public readonly input: IOrganizationCreateInput,
		public readonly token: string
	) {}
}
