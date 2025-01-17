import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ICandidate } from '@leano/contracts';
import { takeUntil } from 'rxjs/operators';
import { CandidateStore } from 'apps/gauzy/src/app/@core/services/candidate-store.service';
@Component({
	selector: 'ga-edit-candidate-hiring',
	templateUrl: './edit-candidate-hiring.component.html'
})
export class EditCandidateHiringComponent implements OnInit, OnDestroy {
	private _ngDestroy$ = new Subject<void>();
	form: FormGroup;
	selectedCandidate: ICandidate;

	constructor(
		private fb: FormBuilder,
		private candidateStore: CandidateStore
	) {}

	ngOnInit() {
		this.candidateStore.selectedCandidate$
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((candidate) => {
				this.selectedCandidate = candidate;

				if (this.selectedCandidate) {
					this._initializeForm(this.selectedCandidate);
				}
			});
	}

	async submitForm() {
		if (this.form.valid) {
			this.candidateStore.candidateForm = {
				...this.form.value
			};
		}
	}

	private _initializeForm(candidate: ICandidate) {
		this.form = this.fb.group({
			appliedDate: [candidate.appliedDate],
			hiredDate: [candidate.hiredDate],
			rejectDate: [candidate.rejectDate]
		});
	}

	ngOnDestroy() {
		this._ngDestroy$.next();
	}
}
