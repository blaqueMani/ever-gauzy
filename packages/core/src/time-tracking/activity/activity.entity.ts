import {
	Entity,
	Column,
	RelationId,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	Index
} from 'typeorm';
import {
	IActivity,
	ActivityType,
	TimeLogSourceEnum,
	IURLMetaData,
	IEmployee,
	ITask,
	ITimeSlot,
	IOrganizationProject
} from '@leano/contracts';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsString,
	IsEnum,
	IsOptional,
	IsNumber,
	IsDateString
} from 'class-validator';
import {
	Employee,
	OrganizationProject,
	Task,
	TenantOrganizationBaseEntity,
	TimeSlot
} from './../../core/entities/internal';
import { getConfig } from '@leano/config';
const config = getConfig();

@Entity('activity')
export class Activity extends TenantOrganizationBaseEntity implements IActivity {

	@ApiProperty({ type: () => String })
	@IsString()
	@Column()
	title: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@Column({ nullable: true })
	description?: string;

	@ApiProperty({ type: () => 'json' })
	@IsDateString()
	@Column({
		nullable: true,
		type: config.dbConnectionOptions.type === 'sqlite' ? 'text' : 'json'
	})
	metaData?: string | IURLMetaData;

	@ApiProperty({ type: () => 'date' })
	@IsDateString()
	@CreateDateColumn({ type: 'date' })
	date: string;

	@ApiProperty({ type: () => 'time' })
	@IsDateString()
	@CreateDateColumn({ type: 'time' })
	time: string;

	@ApiProperty({ type: () => Number })
	@IsNumber()
	@IsOptional()
	@Column({ default: 0 })
	duration?: number;

	@ApiProperty({ type: () => String, enum: ActivityType })
	@IsEnum(ActivityType)
	@IsOptional()
	@Column({ nullable: true })
	type?: string;

	@ApiProperty({ type: () => String, enum: TimeLogSourceEnum })
	@IsEnum(TimeLogSourceEnum)
	@IsString()
	@Column({ default: TimeLogSourceEnum.BROWSER })
	source?: string;

	@ApiProperty({ type: () => 'timestamptz' })
	@IsDateString()
	@Column({ nullable: true, default: null })
	deletedAt?: Date;

	/*
    |--------------------------------------------------------------------------
    | @ManyToOne 
    |--------------------------------------------------------------------------
    */
	// Employee
	@ApiProperty({ type: () => Employee })
	@ManyToOne(() => Employee, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	employee?: IEmployee;

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId((it: Activity) => it.employee)
	@IsString()
	@Index()
	@Column()
	employeeId?: string;

	// Organization Project
	@ApiProperty({ type: () => OrganizationProject })
	@ManyToOne(() => OrganizationProject, (project) => project.activities, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	project?: IOrganizationProject;

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId((it: Activity) => it.project)
	@IsString()
	@IsOptional()
	@Index()
	@Column({ nullable: true })
	projectId?: string;

	// TimeSlot
	@ApiProperty({ type: () => TimeSlot })
	@ManyToOne(() => TimeSlot, (timeSlot) => timeSlot.activities, {
		nullable: true,
		onDelete: 'CASCADE'
	})
	timeSlot?: ITimeSlot;

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId((it: Activity) => it.timeSlot)
	@IsString()
	@Index()
	@Column({ nullable: true })
	readonly timeSlotId?: string;

	// Task
	@ApiProperty({ type: () => Task })
	@ManyToOne(() => Task, (task) => task.activities, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	task?: ITask;

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId((it: Activity) => it.task)
	@IsString()
	@IsOptional()
	@Index()
	@Column({ nullable: true })
	taskId?: string;
}
