import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
	InvitationTypeEnum,
	IInvite,
	IOrganizationProject,
	IOrganizationContact,
	IOrganizationDepartment,
	IOrganization
} from '@leano/contracts';
import { NbDialogRef } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { filter, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EmailInviteFormComponent } from '../forms';
import { TranslationBaseComponent } from '../../language-base';
import {
	OrganizationContactService,
	OrganizationDepartmentsService,
	OrganizationProjectsService,
	Store,
	ToastrService
} from '../../../@core/services';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ga-invite-mutation',
	templateUrl: './invite-mutation.component.html',
	styleUrls: ['./invite-mutation.component.scss']
})
export class InviteMutationComponent
	extends TranslationBaseComponent
	implements OnInit {
	
	/*
	* Getter & Setter for InvitationTypeEnum
	*/
	_invitationType: InvitationTypeEnum;
	get invitationType(): InvitationTypeEnum {
		return this._invitationType;
	}
	@Input() set invitationType(value: InvitationTypeEnum) {
		this._invitationType = value;
	}

	/*
	* Getter & Setter for check Super Admin
	*/
	_isSuperAdmin: boolean;
	get isSuperAdmin(): boolean {
		return this._isSuperAdmin;
	}
	@Input() set isSuperAdmin(value: boolean) {
		this._isSuperAdmin = value;
	}

	@ViewChild('emailInviteForm')
	emailInviteForm: EmailInviteFormComponent;

	organizationProjects: IOrganizationProject[] = [];
	organizationContacts: IOrganizationContact[] = [];
	organizationDepartments: IOrganizationDepartment[] = [];
	public organization: IOrganization;

	constructor(
		private readonly dialogRef: NbDialogRef<InviteMutationComponent>,
		private readonly organizationProjectsService: OrganizationProjectsService,
		private readonly organizationContactService: OrganizationContactService,
		private readonly organizationDepartmentsService: OrganizationDepartmentsService,
		public readonly translateService: TranslateService,
		private readonly toastrService: ToastrService,
		private readonly store: Store
	) {
		super(translateService);
	}

	ngOnInit(): void {
		this.store.selectedOrganization$
			.pipe(
				filter((organization: IOrganization) => !!organization),
				tap((organization: IOrganization) => this.organization = organization),
				tap(() => this.loadOrganizationData()),
				untilDestroyed(this)
			)
			.subscribe();
	}

	async loadOrganizationData() {
		if (!this.organization) {
			return;
		}
		try {
			await this.loadProjects();
			await this.loadOrganizationContacts();
			await this.loadDepartments();
		} catch (error) {
			this.toastrService.danger(error);
		}
	}

	async loadProjects() {
		const { tenantId } = this.store.user;
		const { id: organizationId } = this.organization;

		const { items = [] } = await this.organizationProjectsService.getAll(
			[],
			{ organizationId, tenantId }
		);
		this.organizationProjects = items;
	}

	async loadOrganizationContacts() {
		const { tenantId } = this.store.user;
		const { id: organizationId } = this.organization;

		const { items = [] } = await this.organizationContactService.getAll(
			[],
			{ organizationId, tenantId }
		);
		this.organizationContacts = items;
	}

	async loadDepartments() {
		const { tenantId } = this.store.user;
		const { id: organizationId } = this.organization;

		const { items = [] } = await this.organizationDepartmentsService.getAll(
			[],
			{ organizationId, tenantId }
		);
		this.organizationDepartments = items;
	}

	closeDialog(savedInvites: IInvite[] = []) {
		this.dialogRef.close(savedInvites);
	}

	async add() {
		try {
			const {
				items,
				total,
				ignored
			} = await this.emailInviteForm.saveInvites();

			if (ignored > 0) {
				this.toastrService.warning('INVITE_PAGE.IGNORED', {
					total,
					ignored
				});
			} else {
				this.toastrService.success('INVITE_PAGE.SENT', {
					total
				});
			}
			this.closeDialog(items);
		} catch (error) {
			this.toastrService.danger(error);
		}
	}
}
