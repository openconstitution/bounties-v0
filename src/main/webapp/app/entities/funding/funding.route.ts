import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFunding, Funding } from 'app/shared/model/funding.model';
import { FundingService } from './funding.service';
import { FundingComponent } from './funding.component';
import { FundingDetailComponent } from './funding-detail.component';
import { FundingUpdateComponent } from './funding-update.component';

@Injectable({ providedIn: 'root' })
export class FundingResolve implements Resolve<IFunding> {
  constructor(private service: FundingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFunding> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((funding: HttpResponse<Funding>) => {
          if (funding.body) {
            return of(funding.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Funding());
  }
}

export const fundingRoute: Routes = [
  {
    path: '',
    component: FundingComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.funding.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FundingDetailComponent,
    resolve: {
      funding: FundingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.funding.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FundingUpdateComponent,
    resolve: {
      funding: FundingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.funding.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FundingUpdateComponent,
    resolve: {
      funding: FundingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'bountiesApp.funding.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
