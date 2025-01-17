import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { toLocal } from '@leano/common-angular';

@Pipe({
	name: 'utcToLocal'
})
export class UtcToLocalPipe implements PipeTransform {
	transform(value: any, format: string = 'HH:mm'): any {
		let date = moment(value);
		if (!date.isValid()) {
			date = moment.utc(value, format);
		}
		return toLocal(date).toDate();
	}
}
