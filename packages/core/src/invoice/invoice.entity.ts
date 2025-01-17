import {
	IInvoice,
	CurrenciesEnum,
	InvoiceTypeEnum,
	DiscountTaxTypeEnum,
	IInvoiceEstimateHistory,
	IPayment,
	IInvoiceItem,
	IOrganizationContact,
	IOrganization,
	ITag
} from '@leano/contracts';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsString,
	IsNumber,
	IsBoolean,
	IsDate,
	IsOptional,
	IsEnum
} from 'class-validator';
import {
	Entity,
	Column,
	JoinColumn,
	OneToMany,
	ManyToOne,
	Unique,
	ManyToMany,
	RelationId,
	Index,
	JoinTable
} from 'typeorm';
import {
	InvoiceEstimateHistory,
	InvoiceItem,
	Organization,
	OrganizationContact,
	Payment,
	Tag,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';

@Entity('invoice')
@Unique(['invoiceNumber'])
export class Invoice extends TenantOrganizationBaseEntity implements IInvoice {
	
	@ApiProperty({ type: () => Date })
	@IsDate()
	@Column({ nullable: true })
	invoiceDate: Date;

	@ApiProperty({ type: () => Number })
	@IsNumber()
	@Column({ name: 'invoiceNumber', nullable: true, type: 'numeric' })
	invoiceNumber: number;

	@ApiProperty({ type: () => Date })
	@IsDate()
	@Column({ nullable: true })
	dueDate: Date;

	@ApiProperty({ type: () => String, enum: CurrenciesEnum })
	@IsEnum(CurrenciesEnum)
	@Column()
	currency: string;

	@ApiProperty({ type: () => Number })
	@IsNumber()
	@Column({ type: 'numeric' })
	discountValue: number;

	@ApiProperty({ type: () => Boolean })
	@IsBoolean()
	@Column({ type: Boolean, nullable: true })
	paid: boolean;

	@ApiProperty({ type: () => Number })
	@IsNumber()
	@Column({ nullable: true, type: 'numeric' })
	tax: number;

	@ApiProperty({ type: () => Number })
	@IsNumber()
	@Column({ nullable: true, type: 'numeric' })
	tax2: number;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column()
	terms?: string;

	@ApiPropertyOptional({ type: () => Number })
	@IsNumber()
	@IsOptional()
	@Column({ nullable: true, type: 'numeric' })
	totalValue?: number;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column()
	status?: string;

	@ApiPropertyOptional({ type: () => Boolean })
	@IsBoolean()
	@Column({ type: Boolean, nullable: true })
	isEstimate?: boolean;

	@ApiPropertyOptional({ type: () => Boolean })
	@IsBoolean()
	@Column({ type: Boolean, nullable: true })
	isAccepted?: boolean;

	@ApiProperty({ type: () => String, enum: DiscountTaxTypeEnum })
	@IsEnum(DiscountTaxTypeEnum)
	@Column({ nullable: true })
	discountType: string;

	@ApiProperty({ type: () => String, enum: DiscountTaxTypeEnum })
	@IsEnum(DiscountTaxTypeEnum)
	@Column({ nullable: true })
	taxType: string;

	@ApiProperty({ type: () => String, enum: DiscountTaxTypeEnum })
	@IsEnum(DiscountTaxTypeEnum)
	@Column({ nullable: true })
	tax2Type: string;

	@ApiPropertyOptional({ type: () => String, enum: InvoiceTypeEnum })
	@IsEnum(InvoiceTypeEnum)
	@IsOptional()
	@Column({ nullable: true })
	invoiceType?: string;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	sentTo?: string;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	organizationContactId?: string;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	internalNote?: string;

	@ApiPropertyOptional({ type: () => Number })
	@IsNumber()
	@IsOptional()
	@Column({ nullable: true, type: 'numeric' })
	alreadyPaid?: number;

	@ApiPropertyOptional({ type: () => Number })
	@IsNumber()
	@IsOptional()
	@Column({ nullable: true, type: 'numeric' })
	amountDue?: number;

	@ApiPropertyOptional({ type: () => Boolean })
	@IsBoolean()
	@Column({ type: Boolean, nullable: true })
	hasRemainingAmountInvoiced?: boolean;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	publicLink?: string;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	token?: string;

	@ApiPropertyOptional({ type: () => Boolean })
	@IsBoolean()
	@Column({ type: Boolean, nullable: true })
	isArchived?: boolean;

	/*
    |--------------------------------------------------------------------------
    | @ManyToOne 
    |--------------------------------------------------------------------------
    */
	// From Organization
	@ApiPropertyOptional({ type: () => () => Organization })
	@ManyToOne(() => Organization)
	@JoinColumn()
	fromOrganization?: IOrganization;

	@ApiProperty({ type: () => String })
	@RelationId((it: Invoice) => it.fromOrganization)
	@IsString()
	@Index()
	@Column()
	fromOrganizationId?: string;

	// To Contact
	@ApiPropertyOptional({ type: () => () => OrganizationContact })
	@ManyToOne(() => OrganizationContact, (contact) => contact.invoices, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	toContact?: IOrganizationContact;

	@ApiProperty({ type: () => String })
	@RelationId((it: Invoice) => it.toContact)
	@IsString()
	@Index()
	@Column({ nullable: true })
	toContactId?: string;

	/*
    |--------------------------------------------------------------------------
    | @OneToMany 
    |--------------------------------------------------------------------------
    */
	// Invoice Estimate Items
	@ApiPropertyOptional({ type: () => InvoiceItem, isArray: true })
	@OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice, {
		cascade: true
	})
	@JoinColumn()
	invoiceItems?: IInvoiceItem[];

   	// Invoice Estimate Payments
	@ApiPropertyOptional({ type: () => Payment, isArray: true })
	@OneToMany(() => Payment, (payment) => payment.invoice)
	@JoinColumn()
	payments?: IPayment[];

	// Invoice Estimate History
	@ApiPropertyOptional({ type: () => InvoiceEstimateHistory, isArray: true })
	@OneToMany(() => InvoiceEstimateHistory, (invoiceEstimateHistory) => invoiceEstimateHistory.invoice, { 
		cascade: true
	})
	@JoinColumn()
	historyRecords?: IInvoiceEstimateHistory[];

	/*
    |--------------------------------------------------------------------------
    | @ManyToMany 
    |--------------------------------------------------------------------------
    */
	@ApiProperty({ type: () => Tag })
	@ManyToMany(() => Tag, (tag) => tag.invoices, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE'
	})
	@JoinTable({
		name: 'tag_invoice'
	})
	tags?: ITag[];
}
