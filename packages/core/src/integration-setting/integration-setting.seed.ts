import { Connection } from 'typeorm';
import { IntegrationSetting } from './integration-setting.entity';
import * as faker from 'faker';
import { ITenant } from '@leano/contracts';
import { IntegrationTenant, Organization } from './../core/entities/internal';

export const createRandomIntegrationSetting = async (
	connection: Connection,
	tenants: ITenant[]
): Promise<IntegrationSetting[]> => {
	if (!tenants) {
		console.warn(
			'Warning: tenants not found, Integration Setting  will not be created'
		);
		return;
	}
	const integrationSettings: IntegrationSetting[] = [];
	for (const tenant of tenants) {
		const integrationTenants = await connection.manager.find(IntegrationTenant, {
			where: { tenant: tenant }
		});
		const organizations = await connection.manager.find(Organization, {
			where: { tenant: tenant }
		});
		for (const integrationTenant of integrationTenants) {
			const integrationSetting = new IntegrationSetting();
			integrationSetting.integration = integrationTenant;
			integrationSetting.organization = faker.random.arrayElement(
				organizations
			);
			integrationSetting.tenant = tenant;
			//todo: need to understand real values here
			integrationSetting.settingsName =
				'Setting-' + faker.datatype.number(40);
			integrationSetting.settingsValue = faker.name.jobArea();
			integrationSettings.push(integrationSetting);
		}
	}

	await connection.manager.save(integrationSettings);
};
