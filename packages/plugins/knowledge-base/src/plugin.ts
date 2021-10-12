import { SeederModule } from '@leano/core';
import { IOnPluginBootstrap, IOnPluginDestroy } from '@leano/common';
import {
	ExtensionPlugin,
	OnDefaultPluginSeed,
	OnRandomPluginSeed
} from '@leano/plugin';
import { HelpCenterAuthor, HelpCenterAuthorModule } from './help-center-author';
import { HelpCenter, HelpCenterModule } from './help-center';
import {
	HelpCenterArticle,
	HelpCenterArticleModule
} from './help-center-article';
import { HelpCenterSeederService } from './help-center-seeder.service';

@ExtensionPlugin({
	imports: [
		HelpCenterModule,
		HelpCenterArticleModule,
		HelpCenterAuthorModule,
		SeederModule
	],
	entities: [HelpCenter, HelpCenterArticle, HelpCenterAuthor],
	providers: [HelpCenterSeederService]
})
export class KnowledgeBasePlugin
	implements
		IOnPluginBootstrap,
		IOnPluginDestroy,
		OnDefaultPluginSeed,
		OnRandomPluginSeed {
	constructor(
		private readonly helpCenterSeederService: HelpCenterSeederService
	) {}

	onPluginBootstrap() {}

	onPluginDestroy() {}

	async onDefaultPluginSeed() {
		await this.helpCenterSeederService.createDefault();
	}

	async onRandomPluginSeed() {
		await this.helpCenterSeederService.createRandom();
	}
}
