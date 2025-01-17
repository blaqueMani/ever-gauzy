import { ICommand } from '@nestjs/cqrs';
import { IIntegrationEntitySettingTied } from '@leano/contracts';

export class IntegrationEntitySettingTiedUpdateCommand implements ICommand {
	static readonly type = '[Integration Entity Setting Tied] Update By Integration';

	constructor(
		public readonly integrationId: string,
		public readonly input: IIntegrationEntitySettingTied | IIntegrationEntitySettingTied[],
	) {}
}
