import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { IMonthAggregatedEmployeeStatistics } from '@leano/contracts';
import { NbThemeService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { monthNames } from 'apps/gauzy/src/app/@core/utils/date';
import { TranslationBaseComponent } from 'apps/gauzy/src/app/@shared/language-base/translation-base.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'ga-employee-horizontal-bar-chart',
	template: `
		<div
			*ngIf="noData"
			style="display: flex; flex-direction: column; align-items: center;"
		>
			<nb-icon icon="info-outline"></nb-icon>
			<div>
				{{ 'DASHBOARD_PAGE.CHARTS.NO_MONTH_DATA' | translate }}
			</div>
		</div>
		<chart
			*ngIf="!noData"
			style="height: 500px; width: 500px;"
			type="horizontalBar"
			[data]="data"
			[options]="options"
		></chart>
	`
})
export class EmployeeHorizontalBarChartComponent
	extends TranslationBaseComponent
	implements OnInit, OnDestroy, OnChanges {
	private _ngDestroy$ = new Subject<void>();
	data: any;
	options: any;
	incomeStatistics: number[] = [];
	expenseStatistics: number[] = [];
	profitStatistics: number[] = [];
	bonusStatistics: number[] = [];
	labels: string[] = [];
	selectedDate: Date;
	noData = false;
	@Input()
	employeeStatistics: IMonthAggregatedEmployeeStatistics[];

	constructor(
		private themeService: NbThemeService,
		readonly translateService: TranslateService
	) {
		super(translateService);
	}

	ngOnInit() {
		this._loadData();
		this._LoadChart();
	}

	ngOnChanges() {
		this._loadData();
		this._LoadChart();
	}

	private _LoadChart() {
		this.themeService
			.getJsTheme()
			.pipe(takeUntil(this._ngDestroy$))
			.subscribe((config) => {
				const chartjs: any = config.variables.chartjs;
				const bonusColors = this.bonusStatistics.map((val) =>
					val < 0 ? 'red' : '#0091ff'
				);
				const profitColors = this.profitStatistics.map((val) =>
					val < 0 ? '#ff7b00' : '#66de0b'
				);
				this.data = {
					labels: this.labels,
					datasets: [
						{
							label: this.selectedDate
								? `${this.getTranslation(
										'DASHBOARD_PAGE.CHARTS.REVENUE'
								  )}: ${this.incomeStatistics}`
								: this.getTranslation(
										'DASHBOARD_PAGE.CHARTS.REVENUE'
								  ),
							backgroundColor: '#089c17',
							borderWidth: 1,
							data: this.incomeStatistics
						},
						{
							label: this.selectedDate
								? `${this.getTranslation(
										'DASHBOARD_PAGE.CHARTS.EXPENSES'
								  )}: ${this.expenseStatistics}`
								: this.getTranslation(
										'DASHBOARD_PAGE.CHARTS.EXPENSES'
								  ),
							backgroundColor: '#dbc300',
							data: this.expenseStatistics
						},
						{
							label: this.selectedDate
								? `${this.getTranslation(
										'DASHBOARD_PAGE.CHARTS.PROFIT'
								  )}: ${this.profitStatistics}`
								: this.getTranslation(
										'DASHBOARD_PAGE.CHARTS.PROFIT'
								  ),
							backgroundColor: profitColors,
							data: this.profitStatistics
						},
						{
							label: this.selectedDate
								? `${this.getTranslation(
										'DASHBOARD_PAGE.CHARTS.BONUS'
								  )}: ${this.bonusStatistics}`
								: this.getTranslation(
										'DASHBOARD_PAGE.CHARTS.BONUS'
								  ),
							backgroundColor: bonusColors,
							data: this.bonusStatistics
						}
					]
				};
				this.options = {
					responsive: true,
					maintainAspectRatio: false,
					elements: {
						rectangle: {
							borderWidth: 2
						}
					},
					scales: {
						xAxes: [
							{
								gridLines: {
									display: true,
									color: chartjs.axisLineColor
								},
								ticks: {
									fontColor: chartjs.textColor
								}
							}
						],
						yAxes: [
							{
								gridLines: {
									display: false,
									color: chartjs.axisLineColor
								},
								ticks: {
									fontColor: chartjs.textColor
								}
							}
						]
					},
					legend: {
						position: 'right',
						labels: {
							fontColor: chartjs.textColor
						}
					},
					tooltips: this.selectedDate
						? {
								enabled: true,
								mode: 'dataset',
								callbacks: {
									label: function (tooltipItem, data) {
										const label =
											data.datasets[
												tooltipItem.datasetIndex
											].label || '';
										return label;
									}
								}
						  }
						: {
								enabled: true
						  }
				};
			});
	}
	/**
	 * Populates the local statistics variables with input employeeStatistics data.
	 */
	private async _loadData() {
		this.labels = [];
		this.incomeStatistics = [];
		this.expenseStatistics = [];
		this.profitStatistics = [];
		this.bonusStatistics = [];

		this.noData = !(this.employeeStatistics || []).length;

		(this.employeeStatistics || []).forEach((stat) => {
			const labelValue = `${monthNames[stat.month]} '${stat.year
				.toString(10)
				.substring(2)}`;
			this.labels.push(labelValue);
			this.incomeStatistics.push(stat.income);
			this.expenseStatistics.push(stat.expense);
			this.profitStatistics.push(stat.profit);
			this.bonusStatistics.push(stat.bonus);
		});
	}

	ngOnDestroy() {
		this._ngDestroy$.next();
		this._ngDestroy$.complete();
	}
}
