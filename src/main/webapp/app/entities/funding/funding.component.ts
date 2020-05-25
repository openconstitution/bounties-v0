import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFunding } from 'app/shared/model/funding.model';
import { FundingService } from './funding.service';
import { FundingDeleteDialogComponent } from './funding-delete-dialog.component';

@Component({
  selector: 'jhi-funding',
  templateUrl: './funding.component.html',
})
export class FundingComponent implements OnInit, OnDestroy {
  fundings?: IFunding[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected fundingService: FundingService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.fundingService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IFunding[]>) => (this.fundings = res.body || []));
      return;
    }

    this.fundingService.query().subscribe((res: HttpResponse<IFunding[]>) => (this.fundings = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFundings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFunding): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFundings(): void {
    this.eventSubscriber = this.eventManager.subscribe('fundingListModification', () => this.loadAll());
  }

  delete(funding: IFunding): void {
    const modalRef = this.modalService.open(FundingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.funding = funding;
  }
}
