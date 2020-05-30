import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBounty, Bounty } from 'app/shared/model/bounty.model';
import { BountyService } from './bounty.service';
import { BountyComponent } from './bounty.component';
import { BountyDetailComponent } from './bounty-detail.component';
import { BountyUpdateComponent } from './bounty-update.component';

@Injectable({ providedIn: 'root' })
export class BountyResolve implements Resolve<IBounty> {
  constructor(private service: BountyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBounty> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bounty: HttpResponse<Bounty>) => {
          if (bounty.body) {
            return of(bounty.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Bounty());
  }
}

export const bountyRoute: Routes = [
  {
    path: '',
    component: BountyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.bounties.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BountyDetailComponent,
    resolve: {
      bounty: BountyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.bounties.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BountyUpdateComponent,
    resolve: {
      bounty: BountyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.bounties.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BountyUpdateComponent,
    resolve: {
      bounty: BountyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.bounties.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
