import {
	Entity,
	Column,
	RelationId,
	ManyToOne,
	AfterLoad,
	Index
} from 'typeorm';
import { IScreenshot, ITimeSlot } from '@leano/contracts';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { FileStorage } from './../../core/file-storage';
import {
	TenantOrganizationBaseEntity,
	TimeSlot
} from './../../core/entities/internal';

@Entity('screenshot')
export class Screenshot
	extends TenantOrganizationBaseEntity
	implements IScreenshot {
	
	@ApiProperty({ type: () => String })
	@IsString()
	@Column()
	file: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ default: null, nullable: true })
	thumb?: string;

	@ApiProperty({ type: () => 'timestamptz' })
	@IsNumber()
	@IsOptional()
	@Column({ default: null, nullable: true })
	recordedAt?: Date;

	@ApiProperty({ type: () => 'timestamptz' })
	@IsDateString()
	@Column({ nullable: true, default: null })
	deletedAt?: Date;

	fullUrl?: string;
	thumbUrl?: string;

	@AfterLoad()
	afterLoad?() {
		this.fullUrl = new FileStorage().getProvider().url(this.file);
		this.thumbUrl = new FileStorage().getProvider().url(this.thumb);
	}

	/*
    |--------------------------------------------------------------------------
    | @ManyToOne 
    |--------------------------------------------------------------------------
    */

	/**
	 * TimeSlot
	 */
	@ApiProperty({ type: () => TimeSlot })
	@ManyToOne(() => TimeSlot, (timeSlot) => timeSlot.screenshots, {
		onDelete: 'CASCADE'
	})
	timeSlot?: ITimeSlot;

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId((it: Screenshot) => it.timeSlot)
	@IsString()
	@Index()
	@Column({ nullable: true })
	readonly timeSlotId?: string;
}
