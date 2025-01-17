import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantAwareCrudService } from './../core/crud';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { IPagination, IWarehouse } from '@leano/contracts';

@Injectable()
export class WarehouseService extends TenantAwareCrudService<Warehouse> {
	constructor(
		@InjectRepository(Warehouse)
		private readonly warehouseRepository: Repository<Warehouse>
	) {
		super(warehouseRepository);
	}

	async update(id: string, warehouse: Warehouse): Promise<IWarehouse> {
		return await this.warehouseRepository.save({ id, ...warehouse });
	}

	async findAllWarehouses(
		relations?: string[],
		findInput?: any
	): Promise<IPagination<IWarehouse>> {
		return await this.findAll({
			where: {
				...findInput
			},
			relations
		});
	}
}
