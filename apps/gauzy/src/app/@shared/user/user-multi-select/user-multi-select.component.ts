import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '@leano/contracts';

@Component({
	selector: 'ga-user-multi-select',
	templateUrl: './user-multi-select.component.html'
})
export class UserSelectComponent {
	@Input() selectedUserIds: string[];
	@Input() allUsers: IUser[];

	@Output() selectedChange = new EventEmitter();

	constructor() {}

	onMembersSelected(selectEvent: any): void {
		this.selectedChange.emit(selectEvent);
	}
}
