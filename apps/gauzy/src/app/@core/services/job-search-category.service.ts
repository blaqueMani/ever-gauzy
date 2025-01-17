import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJobSearchCategory, IPagination } from '@leano/contracts';
import { toParams } from '@leano/common-angular';
import { API_PREFIX } from '../constants/app.constants';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class JobSearchCategoryService {
	constructor(private http: HttpClient) {}

	getAll(request?: any) {
		return firstValueFrom(
			this.http
			.get<IPagination<IJobSearchCategory>>(
				`${API_PREFIX}/job-preset/job-search-category`,
				{
					params: request ? toParams(request) : {}
				}
			)
		);
	}

	create(request?: IJobSearchCategory) {
		return firstValueFrom(
			this.http
			.post<IJobSearchCategory>(
				`${API_PREFIX}/job-preset/job-search-category`,
				request
			)
		);
	}
}
