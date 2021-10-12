import { ICommand } from '@nestjs/cqrs';
import {
	LanguagesEnum,
	IEmployeeAppointmentCreateInput
} from '@leano/contracts';

export class EmployeeAppointmentCreateCommand implements ICommand {
	static readonly type = '[EmployeeAppointment] Register';

	constructor(
		public readonly employeeAppointmentInput: IEmployeeAppointmentCreateInput,
		public readonly languageCode: LanguagesEnum
	) {}
}
