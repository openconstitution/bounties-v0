import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BountiesSharedModule } from 'app/shared/shared.module';
import { BountyComponent } from './bounty.component';
import { BountyDetailComponent } from './bounty-detail.component';
import { BountyUpdateComponent } from './bounty-update.component';
import { BountyDeleteDialogComponent } from './bounty-delete-dialog.component';
import { bountyRoute } from './bounty.route';

@NgModule({
  imports: [BountiesSharedModule, RouterModule.forChild(bountyRoute)],
  declarations: [BountyComponent, BountyDetailComponent, BountyUpdateComponent, BountyDeleteDialogComponent],
  entryComponents: [BountyDeleteDialogComponent],
})
export class BountiesBountyModule {}
