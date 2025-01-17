// Code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
	DeepPartial,
	DeleteResult,
	FindConditions,
	FindManyOptions,
	FindOneOptions,
	Repository,
	SelectQueryBuilder,
	UpdateResult
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import * as moment from 'moment';
import { environment as env } from '@leano/config';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../entities/internal';
import { ICrudService } from './icrud.service';
import { IPagination } from '@leano/contracts';
import { ITryRequest } from './try-request';
import { filterQuery } from './query-builder';
import { mergeMap } from 'rxjs/operators';
import { RequestContext } from 'core/context';
import { of as observableOf, throwError } from 'rxjs';

export abstract class CrudService<T extends BaseEntity>
	implements ICrudService<T> {
	saltRounds: number;

	protected constructor(protected readonly repository: Repository<T>) {
		this.saltRounds = env.USER_PASSWORD_BCRYPT_SALT_ROUNDS;
	}

	public async count(filter?: FindManyOptions<T>): Promise<number> {
		return await this.repository.count(filter);
	}

	public async findAll(filter?: FindManyOptions<T>): Promise<IPagination<T>> {
		const total = await this.repository.count(filter);
		const items = await this.repository.find(filter);
		return { items, total };
	}

	public async paginate(filter?: any): Promise<IPagination<T>> {
		try {
			let options: FindManyOptions = {};
			options.skip = filter && filter.skip ? (filter.take * (filter.skip - 1)) : 0;
			options.take = filter && filter.take ? (filter.take) : 10;
			if (filter) {
				if (filter.orderBy && filter.order) {
					options.order = {
						[filter.orderBy]: filter.order
					}
				} else if (filter.orderBy) {
					options.order = filter.orderBy;
				}
				if (filter.relations) {
					options.relations = filter.relations;
				}
				if (filter.join) {
					options.join = filter.join;
				}
			}
			options.where = (qb: SelectQueryBuilder<T>) => {
				if (filter && (filter.filters || filter.where)) {
					if (filter.where) {
						const wheres: any = {}
						for (const field in filter.where) {
							if (Object.prototype.hasOwnProperty.call(filter.where, field)) {
								wheres[field] = filter.where[field];
							}
						}
						filterQuery(qb, wheres);
					}
				}
				const tenantId = RequestContext.currentTenantId();
				qb.andWhere(`"${qb.alias}"."tenantId" = :tenantId`, { tenantId });
				console.log(qb.getQueryAndParameters(), moment().format('DD.MM.YYYY HH:mm:ss'));
			}
			console.log(filter, moment().format('DD.MM.YYYY HH:mm:ss'));
			const [items, total] = await this.repository.findAndCount(options);
			return { items, total };
		} catch (error) {
			console.log(error);
			throw new BadRequestException(error);
		}
	}

	public async findOneOrFailByIdString(
		id: string,
		options?: FindOneOptions<T>
	): Promise<ITryRequest> {
		try {
			const record = await this.repository.findOneOrFail(
				id,
				options
			);
			return {
				success: true,
				record
			};
		} catch (error) {
			return {
				success: false,
				error
			};
		}
	}
	
	public async findOneOrFailByIdNumber(
		id: number,
		options?: FindOneOptions<T>
	): Promise<ITryRequest> {
		try {
			const record = await this.repository.findOneOrFail(
				id,
				options
			);
			return {
				success: true,
				record
			};
		} catch (error) {
			return {
				success: false,
				error
			};
		}
	}

	public async findOneOrFailByDate(
		id: Date,
		options?: FindOneOptions<T>
	): Promise<ITryRequest> {
		try {
			const record = await this.repository.findOneOrFail(
				id,
				options
			);
			return {
				success: true,
				record
			};
		} catch (error) {
			return {
				success: false,
				error
			};
		}
	}

	public async findOneOrFailByOptions(
		options: FindOneOptions<T>		
	): Promise<ITryRequest> {
		try {
			const record = await this.repository.findOneOrFail(
				options				
			);
			return {
				success: true,
				record
			};
		} catch (error) {
			return {
				success: false,
				error
			};
		}
	}

	public async findOneOrFailByConditions(
		conditions: FindConditions<T>,
		options?: FindOneOptions<T>
	): Promise<ITryRequest> {
		try {
			const record = await this.repository.findOneOrFail(
				conditions,
				options
			);
			return {
				success: true,
				record
			};
		} catch (error) {
			return {
				success: false,
				error
			};
		}
	}

	/*
    |--------------------------------------------------------------------------
    | @FindOne
    |--------------------------------------------------------------------------
    */

	/**
	 * Finds first entity that matches given id and options.
	 *
	 * @param id {string}
	 * @param options
	 * @returns
	 */
	public async findOneByIdString(
		id: string,
		options?: FindOneOptions<T>
	): Promise<T> {
		const record = await this.repository.findOne(
			id,
			options
		);
		if (!record) {
			throw new NotFoundException(`The requested record was not found`);
		}
		return record;
	}

	/**
	 * Finds first entity that matches given id and options.
	 *
	 * @param id {number}
	 * @param options
	 * @returns
	 */
	public async findOneByIdNumber(
		id: number,
		options?: FindOneOptions<T>
	): Promise<T> {
		const record = await this.repository.findOne(
			id,
			options
		);
		if (!record) {
			throw new NotFoundException(`The requested record was not found`);
		}
		return record;
	}

	/**
	 * Finds first entity that matches given options.
	 *
	 * @param options
	 * @returns
	 */
	public async findOneByOptions(
		options: FindOneOptions<T>
	): Promise<T> {
		const record = await this.repository.findOne(
			options
		);
		if (!record) {
			throw new NotFoundException(`The requested record was not found`);
		}
		return record;
	}

	/**
	 * Finds first entity that matches given conditions and options.
	 *
	 * @param conditions
	 * @param options
	 * @returns
	 */
	public async findOneByConditions(
		conditions: FindConditions<T>,
		options?: FindOneOptions<T>
	): Promise<T> {
		const record = await this.repository.findOne(
			conditions,
			options
		);
		if (!record) {
			throw new NotFoundException(`The requested record was not found`);
		}
		return record;
	}

	public async create(entity: DeepPartial<T>, ...options: any[]): Promise<T> {
		const obj = this.repository.create(entity);
		try {
			// https://github.com/Microsoft/TypeScript/issues/21592
			return await this.repository.save(obj as any);
		} catch (err /*: WriteError*/) {
			throw new BadRequestException(err);
		}
	}

	async getPasswordHash(password: string): Promise<string> {
		return bcrypt.hash(password, this.saltRounds);
	}

	public async update(
		id: string | number | FindConditions<T>,
		partialEntity: QueryDeepPartialEntity<T>,
		...options: any[]
	): Promise<UpdateResult | T> {
		try {
			// try if can import somehow the service and use its method
			return await this.repository.update(id, partialEntity);
		} catch (err /*: WriteError*/) {
			throw new BadRequestException(err);
		}
	}

	public async delete(
		criteria: string | number | FindConditions<T>,
		...options: any[]
	): Promise<DeleteResult> {
		try {
			return await this.repository.delete(criteria);
		} catch (error) {
			console.log(error)
			throw new NotFoundException(`The record was not found`, error);
		}
	}

	/**
	 * e.g., findOneById(id).pipe(map(entity => entity.id), entityNotFound())
	 */
	private entityNotFound() {
		return (stream$) =>
			stream$.pipe(
				mergeMap((signal) => {
					if (!signal) {
						return throwError(() =>
							new NotFoundException(
								`The requested record was not found`
							)
						);
					}
					return observableOf(signal);
				})
			);
	}
}
