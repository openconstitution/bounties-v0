import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBounty } from 'app/shared/model/bounty.model';
import { BountyService } from './bounty.service';

@Component({
  templateUrl: './bounty-delete-dialog.component.html',
})
export class BountyDeleteDialogComponent {
  bounty?: IBounty;

  constructor(protected bountyService: BountyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bountyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('bountiesListModification');
      this.activeModal.close();
    });
  }
}
