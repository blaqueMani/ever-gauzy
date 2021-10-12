import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployeeProposalTemplate, IPagination } from '@leano/contracts';
import { toParams } from '@leano/common-angular';
import { first } from 'rxjs/operators';
import { API_PREFIX } from '../../../@core/constants';

@Injectable({
	providedIn: 'root'
})
export class ProposalTemplateService {
	API_URL = `${API_PREFIX}/employee-proposal-template`;

	constructor(private http: HttpClient) {}

	getAll(request: any = {}) {
		return this.http
			.get<IPagination<IEmployeeProposalTemplate>>(this.API_URL, {
				params: toParams(request)
			})
			.pipe(first())
			.toPromise();
	}

	create(request) {
		return this.http
			.post<IEmployeeProposalTemplate>(this.API_URL, request)
			.pipe(first())
			.toPromise();
	}

	update(id, request: IEmployeeProposalTemplate) {
		return this.http
			.put<IEmployeeProposalTemplate>(`${this.API_URL}/${id}`, request)
			.pipe(first())
			.toPromise();
	}

	makeDefault(id) {
		return this.http
			.post<IEmployeeProposalTemplate>(
				`${this.API_URL}/${id}/make-default`,
				{}
			)
			.pipe(first())
			.toPromise();
	}

	delete(id: string) {
		return this.http
			.delete(`${this.API_URL}/${id}`)
			.pipe(first())
			.toPromise();
	}
}
