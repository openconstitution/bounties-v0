import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BountiesSharedModule } from 'app/shared/shared.module';
import { BountiesComponent } from './bounties.component';
import { BountiesDetailComponent } from './bounties-detail.component';
import { BountiesUpdateComponent } from './bounties-update.component';
import { BountiesDeleteDialogComponent } from './bounties-delete-dialog.component';
import { bountiesRoute } from './bounties.route';

@NgModule({
  imports: [BountiesSharedModule, RouterModule.forChild(bountiesRoute)],
  declarations: [BountiesComponent, BountiesDetailComponent, BountiesUpdateComponent, BountiesDeleteDialogComponent],
  entryComponents: [BountiesDeleteDialogComponent],
})
export class BountiesBountiesModule {}
