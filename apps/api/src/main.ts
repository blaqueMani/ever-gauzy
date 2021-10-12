import { bootstrap } from '@leano/core';
import { pluginConfig } from './plugin-config';

bootstrap(pluginConfig).catch((error) => {
	console.log(error);
	process.exit(1);
});
