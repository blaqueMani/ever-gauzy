import {
	IEmployee,
	IEmployeeUpdateInput,
	IUserFindInput,
	IEmployeeStoreState
} from '@leano/contracts';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Query, Store as AkitaStore, StoreConfig } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'employee', resettable: true })
export class EmployeeAkitaStore extends AkitaStore<IEmployeeStoreState> {
	constructor() {
		super({} as IEmployeeStoreState);
	}
}

@Injectable({ providedIn: 'root' })
export class EmployeeAkitaQuery extends Query<IEmployeeStoreState> {
	constructor(protected store: EmployeeAkitaStore) {
		super(store);
	}
}

/**
 * Service used to update employee
 */
@Injectable()
export class EmployeeStore {
	private _selectedEmployee: IEmployee;
	private _userForm: IUserFindInput;
	private _employeeForm: IEmployeeUpdateInput;

	constructor(
		protected employeeAkitaStore: EmployeeAkitaStore,
		protected employeeAkitaQuery: EmployeeAkitaQuery
	) {}

	selectedEmployee$: BehaviorSubject<IEmployee> = new BehaviorSubject(
		this.selectedEmployee
	);

	userForm$: BehaviorSubject<IUserFindInput> = new BehaviorSubject(
		this.userForm
	);

	employeeForm$: BehaviorSubject<IEmployeeUpdateInput> = new BehaviorSubject(
		this.employeeForm
	);

	set selectedEmployee(employee: IEmployee) {
		this._selectedEmployee = employee;
		this.selectedEmployee$.next(employee);
	}

	get selectedEmployee(): IEmployee {
		return this._selectedEmployee;
	}

	employeeAction$ = this.employeeAkitaQuery.select(({ action, employee }) => {
		return { action, employee };
	});

	set employeeAction({ action, employee }: IEmployeeStoreState) {
		this.employeeAkitaStore.update({
			action,
			employee
		});
	}

	set userForm(user: IUserFindInput) {
		this._userForm = user;
		this.userForm$.next(user);
	}

	get userForm(): IUserFindInput {
		return this._userForm;
	}

	set employeeForm(employee: IEmployeeUpdateInput) {
		this._employeeForm = employee;
		this.employeeForm$.next(employee);
	}

	get employeeForm(): IEmployeeUpdateInput {
		return this._employeeForm;
	}

	destroy() {
		this.employeeAkitaStore.reset();
	}
}
