import { ICommand } from '@nestjs/cqrs';
import { IExpense } from '@leano/contracts';

export class ExpenseUpdateCommand implements ICommand {
	static readonly type = '[Expense] Update';

	constructor(public readonly id: string, public readonly entity: IExpense) {}
}
