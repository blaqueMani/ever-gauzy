import { seedDefault } from '@leano/core';
import { pluginConfig } from './plugin-config';

seedDefault(pluginConfig).catch((error: any) => {
	console.log(error);
	process.exit(1);
});