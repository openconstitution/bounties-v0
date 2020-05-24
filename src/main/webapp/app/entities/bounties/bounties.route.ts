import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBounties, Bounties } from 'app/shared/model/bounties.model';
import { BountiesService } from './bounties.service';
import { BountiesComponent } from './bounties.component';
import { BountiesDetailComponent } from './bounties-detail.component';
import { BountiesUpdateComponent } from './bounties-update.component';

@Injectable({ providedIn: 'root' })
export class BountiesResolve implements Resolve<IBounties> {
  constructor(private service: BountiesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBounties> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bounties: HttpResponse<Bounties>) => {
          if (bounties.body) {
            return of(bounties.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Bounties());
  }
}

export const bountiesRoute: Routes = [
  {
    path: '',
    component: BountiesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.bounties.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BountiesDetailComponent,
    resolve: {
      bounties: BountiesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.bounties.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BountiesUpdateComponent,
    resolve: {
      bounties: BountiesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.bounties.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BountiesUpdateComponent,
    resolve: {
      bounties: BountiesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.bounties.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
