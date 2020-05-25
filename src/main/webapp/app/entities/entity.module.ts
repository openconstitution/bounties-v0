import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'bounties',
        loadChildren: () => import('./bounties/bounties.module').then(m => m.BountiesBountiesModule),
      },
      {
        path: 'funding',
        loadChildren: () => import('./funding/funding.module').then(m => m.BountiesFundingModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.BountiesProfileModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class BountiesEntityModule {}
