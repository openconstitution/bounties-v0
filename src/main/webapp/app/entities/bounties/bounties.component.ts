import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBounties } from 'app/shared/model/bounties.model';
import { BountiesService } from './bounties.service';
import { BountiesDeleteDialogComponent } from './bounties-delete-dialog.component';

@Component({
  selector: 'jhi-bounties',
  templateUrl: './bounties.component.html',
})
export class BountiesComponent implements OnInit, OnDestroy {
  bounties?: IBounties[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected bountiesService: BountiesService,
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
      this.bountiesService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IBounties[]>) => (this.bounties = res.body || []));
      return;
    }

    this.bountiesService.query().subscribe((res: HttpResponse<IBounties[]>) => (this.bounties = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBounties();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBounties): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBounties(): void {
    this.eventSubscriber = this.eventManager.subscribe('bountiesListModification', () => this.loadAll());
  }

  delete(bounties: IBounties): void {
    const modalRef = this.modalService.open(BountiesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bounties = bounties;
  }
}
