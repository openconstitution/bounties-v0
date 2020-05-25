import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BountiesSharedModule } from 'app/shared/shared.module';
import { FundingComponent } from './funding.component';
import { FundingDetailComponent } from './funding-detail.component';
import { FundingUpdateComponent } from './funding-update.component';
import { FundingDeleteDialogComponent } from './funding-delete-dialog.component';
import { fundingRoute } from './funding.route';

@NgModule({
  imports: [BountiesSharedModule, RouterModule.forChild(fundingRoute)],
  declarations: [FundingComponent, FundingDetailComponent, FundingUpdateComponent, FundingDeleteDialogComponent],
  entryComponents: [FundingDeleteDialogComponent],
})
export class BountiesFundingModule {}
