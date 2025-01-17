import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RouterModule } from 'nest-router';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from '@leano/config';
import { getEntitiesFromPlugins } from '@leano/plugin';
import { ImportAllController } from './import-all.controller';
import { ImportAllService } from './import-all.service';
import { coreEntities } from './../../core/entities';
import { CommandHandlers } from './commands/handlers';
import { ImportRecordModule } from './../import-record';
import { ImportHistoryModule } from './../import-history';

@Module({
	imports: [
		RouterModule.forRoutes([
			{
				path: '/import',
				module: ImportAllModule
			}
		]),
		CqrsModule,
		MulterModule.register({
			dest: './import'
		}),
		TypeOrmModule.forFeature([
			...coreEntities,
			...getEntitiesFromPlugins(getConfig().plugins)
		]),
		ImportRecordModule,
		ImportHistoryModule
	],
	controllers: [ImportAllController],
	providers: [
		ImportAllService,
		...CommandHandlers
	],
	exports: [ImportAllService]
})
export class ImportAllModule {}
