import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFunding } from 'app/shared/model/funding.model';
import { FundingService } from './funding.service';

@Component({
  templateUrl: './funding-delete-dialog.component.html',
})
export class FundingDeleteDialogComponent {
  funding?: IFunding;

  constructor(protected fundingService: FundingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fundingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fundingListModification');
      this.activeModal.close();
    });
  }
}
