import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';
import {
	ImageViewerComponent,
	SettingsComponent,
	ScreenCaptureComponent,
	TimeTrackerComponent,
	SetupComponent,
	UpdaterComponent
} from '@leano/desktop-ui-lib';

const routes: Routes = [
	{
		path: '',
		component: TimeTrackerComponent
	},
	{
		path: 'setup',
		component: SetupComponent
	},
	{
		path: 'time-tracker',
		component: TimeTrackerComponent
	},
	{
		path: 'screen-capture',
		component: ScreenCaptureComponent
	},
	{
		path: 'settings',
		component: SettingsComponent
	},
	{
		path: 'updater',
		component: UpdaterComponent
	},
	{
		path: 'viewer',
		component: ImageViewerComponent
	}
];

const config: ExtraOptions = {
	useHash: true
};

@NgModule({
	imports: [RouterModule.forRoot(routes, config)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
