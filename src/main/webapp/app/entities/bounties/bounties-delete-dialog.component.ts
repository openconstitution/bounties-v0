import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBounties } from 'app/shared/model/bounties.model';
import { BountiesService } from './bounties.service';

@Component({
  templateUrl: './bounties-delete-dialog.component.html',
})
export class BountiesDeleteDialogComponent {
  bounties?: IBounties;

  constructor(protected bountiesService: BountiesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bountiesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('bountiesListModification');
      this.activeModal.close();
    });
  }
}
