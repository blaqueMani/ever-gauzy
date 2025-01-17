import { IAggregatedEmployeeStatisticFindInput } from '@leano/contracts';
import { IQuery } from '@nestjs/cqrs';

export class AggregatedEmployeeStatisticQuery implements IQuery {
	static readonly type = '[EmployeeStatistic] Aggregated Employee Statistic';

	constructor(public readonly input: IAggregatedEmployeeStatisticFindInput) {}
}
