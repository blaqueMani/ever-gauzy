import { Pipe, PipeTransform } from '@angular/core';
import { IOrganization, RegionsEnum } from '@leano/contracts';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';
import { Store } from '../../@core/services/store.service';
import { isEmpty } from '@leano/common-angular';

@UntilDestroy({ checkProperties: true })
@Pipe({
	name: 'dateFormat',
	pure: false
})
export class DateFormatPipe implements PipeTransform {
	dateFormat: string = 'd MMMM, y';;
	regionCode: string = RegionsEnum.EN;

	constructor(private store: Store) {
		this.store.selectedOrganization$
			.pipe(
				filter((organization: IOrganization) => !!organization),
				untilDestroyed(this)
			)
			.subscribe((organization: IOrganization) => {
				this.regionCode = organization.regionCode;
				this.dateFormat = organization.dateFormat;
			});
	}

	transform(
		value: Date | string | number | null | undefined,
		locale?: string
	) {
		if (!value) {
			return;
		}

		let date = moment(new Date(value));
		if (!date.isValid()) {
			date = moment.utc(value);
		}
		
		if (isEmpty(locale)) {
			locale = this.regionCode;
		}
		if (date && this.dateFormat) {
			return date.locale(locale).format(this.dateFormat);
		}
		return;
	}
}
