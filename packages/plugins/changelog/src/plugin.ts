import { SeederModule } from '@leano/core';
import { IOnPluginBootstrap, IOnPluginDestroy } from '@leano/common';
import { ExtensionPlugin, OnBasicPluginSeed } from '@leano/plugin';
import { ChangelogModule } from './changelog.module';
import { Changelog } from './changelog.entity';
import { ChangelogSeederService } from './changelog-seeder.service';

@ExtensionPlugin({
	imports: [ChangelogModule, SeederModule],
	entities: [Changelog],
	providers: [ChangelogSeederService]
})
export class ChangelogPlugin
	implements IOnPluginBootstrap, IOnPluginDestroy, OnBasicPluginSeed {
	constructor(
		private readonly changelogSeederService: ChangelogSeederService
	) {}

	onPluginBootstrap() {}

	onPluginDestroy() {}

	async onBasicPluginSeed() {
		await this.changelogSeederService.createBasicDefault();
	}
}
