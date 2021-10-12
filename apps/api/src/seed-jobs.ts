import { seedJob } from '@leano/core';
import { pluginConfig } from './plugin-config';

seedJob(pluginConfig).catch((error: any) => {
	console.log(error);
	process.exit(1);
});
