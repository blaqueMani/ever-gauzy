import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsEnum } from '@leano/contracts';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DocumentsComponent } from './documents.component';

const routes: Routes = [
	{
		path: '',
		component: DocumentsComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ALL_ORG_VIEW],
				redirectTo: '/pages/dashboard'
			}
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DocumentsRoutingModule {}
