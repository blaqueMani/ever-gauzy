import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EquipmentSharingPolicyComponent } from './equipment-sharing-policy.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { PermissionsEnum } from '@leano/contracts';

const routes: Routes = [
	{
		path: '',
		component: EquipmentSharingPolicyComponent,
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
export class EquipmentSharingPolicyRoutingModule {}
