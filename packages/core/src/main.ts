import {
	DEFAULT_API_HOST,
	DEFAULT_API_PORT,
	DEFAULT_API_BASE_URL,
	DEFAULT_GRAPHQL_API_PATH
} from '@leano/common';
import { dbConnectionConfig } from '@leano/config';
import { bootstrap } from './bootstrap';

bootstrap({
	apiConfigOptions: {
		host: process.env.API_HOST || DEFAULT_API_HOST,
		port: process.env.API_PORT || DEFAULT_API_PORT,
		baseUrl: process.env.API_BASE_URL || DEFAULT_API_BASE_URL,
		middleware: [],
		graphqlConfigOptions: {
			path: DEFAULT_GRAPHQL_API_PATH,
			playground: true,
			debug: true,
			apolloServerPlugins: []
		}
	},
	dbConnectionOptions: {
		synchronize: true,
		...dbConnectionConfig
	},
	plugins: []
}).catch((error) => {
	console.log(error);
	process.exit(1);
});
