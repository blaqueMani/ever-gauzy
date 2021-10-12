import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { IChangelog } from '@leano/contracts';
import { TenantOrganizationBaseEntity } from '@leano/core';

@Entity('changelog')
export class Changelog
	extends TenantOrganizationBaseEntity
	implements IChangelog {
	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	icon?: string;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	title?: string;

	@ApiProperty({ type: () => Date })
	@IsDate()
	@IsOptional()
	@Column()
	date?: Date;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column()
	content?: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column()
	learnMoreUrl?: string;
}
