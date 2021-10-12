import { ICommand } from '@nestjs/cqrs';
import { IIncomeCreateInput } from '@leano/contracts';

export class IncomeCreateCommand implements ICommand {
	static readonly type = '[Income] Create';

	constructor(public readonly input: IIncomeCreateInput) {}
}
