import { seedModule } from '@leano/core';
import { pluginConfig } from './plugin-config';

seedModule(pluginConfig).catch((error: any) => {
	console.log(error);
	process.exit(1);
});
