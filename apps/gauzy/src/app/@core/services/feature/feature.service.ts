import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IFeature,
	IFeatureOrganization,
	IFeatureOrganizationUpdateInput,
	IFeatureOrganizationFindInput,
	IPagination
} from '@leano/contracts';
import { toParams } from '@leano/common-angular';
import { firstValueFrom, Observable } from 'rxjs';
import { API_PREFIX } from '../../constants/app.constants';

@Injectable()
export class FeatureService {
	API_URL = `${API_PREFIX}/feature/toggle`;

	constructor(private http: HttpClient) {}

	getFeatureToggleDefinition() {
		return firstValueFrom(
			this.http.get(`${this.API_URL}/definition`)
		);
	}

	getParentFeatures(
		relations?: string[]
	): Observable<{ items: IFeature[]; total: number }> {
		const data = { relations };
		return this.http.get<{ items: IFeature[]; total: number }>(
			`${this.API_URL}/parent`,
			{
				params: toParams({ data })
			}
		);
	}

	getAllFeatures(): Observable<{ items: IFeature[]; total: number }> {
		return this.http.get<{ items: IFeature[]; total: number }>(
			`${this.API_URL}`
		);
	}

	getFeatureOrganizations(
		findInput?: IFeatureOrganizationFindInput,
		relations?: string[]
	): Observable<IPagination<IFeatureOrganization>> {
		const data = { relations, findInput };
		return this.http.get<IPagination<IFeatureOrganization>>(
			`${this.API_URL}/organizations`,
			{
				params: toParams({ data })
			}
		);
	}

	featureToggle(payload: IFeatureOrganizationUpdateInput) {
		return this.http.post(`${this.API_URL}`, payload);
	}
}
