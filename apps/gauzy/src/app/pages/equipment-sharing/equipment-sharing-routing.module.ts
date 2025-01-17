import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EquipmentSharingComponent } from './equipment-sharing.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { PermissionsEnum } from '@leano/contracts';

const routes: Routes = [
	{
		path: '',
		component: EquipmentSharingComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: [
					PermissionsEnum.ALL_ORG_VIEW,
					PermissionsEnum.ORG_EQUIPMENT_SHARING_VIEW
				],
				redirectTo: '/pages/dashboard'
			}
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EquipmentSharingRoutingModule {}
