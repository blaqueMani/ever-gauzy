import { IRecurringExpenseEditInput as IExpenseEditInput } from '@leano/contracts';
import { ICommand } from '@nestjs/cqrs';

export class OrganizationRecurringExpenseEditCommand implements ICommand {
	static readonly type = '[OrganizationRecurringExpense] Edit';

	constructor(
		public readonly id: string,
		public readonly input: IExpenseEditInput
	) {}
}
