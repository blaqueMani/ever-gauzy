import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IApprovalPolicy,
	IApprovalPolicyFindInput,
	IApprovalPolicyCreateInput,
	IPagination
} from '@leano/contracts';
import { firstValueFrom } from 'rxjs';
import { API_PREFIX } from '../constants/app.constants';

@Injectable()
export class ApprovalPolicyService {
	APPROVAL_POLICY_URL = `${API_PREFIX}/approval-policy`;

	constructor(private http: HttpClient) { }

	getAll(
		relations?: string[],
		findInput?: IApprovalPolicyFindInput
	): Promise<IPagination<IApprovalPolicy>> {
		const data = JSON.stringify({ relations, findInput });
		return firstValueFrom(
			this.http
				.get<IPagination<IApprovalPolicy>>(
					`${this.APPROVAL_POLICY_URL}`,
					{
						params: { data }
					}
				)
		);
	}

	getForRequestApproval(
		relations?: string[],
		findInput?: IApprovalPolicyFindInput
	): Promise<IPagination<IApprovalPolicy>> {
		const data = JSON.stringify({ relations, findInput });
		return firstValueFrom(
			this.http
				.get<IPagination<IApprovalPolicy>>(
					`${this.APPROVAL_POLICY_URL}/request-approval`,
					{
						params: { data }
					}
				)
		);
	}

	delete(id: string): Promise<any> {
		return firstValueFrom(
			this.http
				.delete(`${this.APPROVAL_POLICY_URL}/${id}`)
		);
	}

	save(approvalPolicy: IApprovalPolicyCreateInput): Promise<IApprovalPolicy> {
		if (!approvalPolicy.id) {
			return firstValueFrom(
				this.http
					.post<IApprovalPolicy>(this.APPROVAL_POLICY_URL, approvalPolicy)
			);
		} else {
			return firstValueFrom(
				this.http
					.put<IApprovalPolicy>(
						`${this.APPROVAL_POLICY_URL}/${approvalPolicy.id}`,
						approvalPolicy
					)
			);
		}
	}
}
