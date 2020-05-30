import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBounty } from 'app/shared/model/bounty.model';
import { BountyService } from './bounty.service';
import { BountyDeleteDialogComponent } from './bounty-delete-dialog.component';

@Component({
  selector: 'jhi-bounty',
  templateUrl: './bounty.component.html',
})
export class BountyComponent implements OnInit, OnDestroy {
  bounty?: IBounty[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected bountyService: BountyService,
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
      this.bountyService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IBounty[]>) => (this.bounty = res.body || []));
      return;
    }

    this.bountyService.query().subscribe((res: HttpResponse<IBounty[]>) => (this.bounty = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBounty();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBounty): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBounty(): void {
    this.eventSubscriber = this.eventManager.subscribe('bountyListModification', () => this.loadAll());
  }

  delete(bounty: IBounty): void {
    const modalRef = this.modalService.open(BountyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bounty = bounty;
  }
}
