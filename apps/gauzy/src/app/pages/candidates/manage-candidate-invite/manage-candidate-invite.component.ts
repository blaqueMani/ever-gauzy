import { Component } from '@angular/core';
import { InvitationTypeEnum } from '@leano/contracts';

@Component({
	selector: 'ga-manage-candidate-invite',
	templateUrl: './manage-candidate-invite.component.html'
})
export class ManageCandidateInviteComponent {

	invitationTypeEnum = InvitationTypeEnum;

	constructor() {}
}
