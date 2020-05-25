import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFunding, Funding } from 'app/shared/model/funding.model';
import { FundingService } from './funding.service';
import { IBounties } from 'app/shared/model/bounties.model';
import { BountiesService } from 'app/entities/bounties/bounties.service';

@Component({
  selector: 'jhi-funding-update',
  templateUrl: './funding-update.component.html',
})
export class FundingUpdateComponent implements OnInit {
  isSaving = false;
  bounties: IBounties[] = [];

  editForm = this.fb.group({
    id: [],
    amount: [],
    mode: [],
    paymentAuth: [],
    bounties: [],
  });

  constructor(
    protected fundingService: FundingService,
    protected bountiesService: BountiesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ funding }) => {
      this.updateForm(funding);

      this.bountiesService.query().subscribe((res: HttpResponse<IBounties[]>) => (this.bounties = res.body || []));
    });
  }

  updateForm(funding: IFunding): void {
    this.editForm.patchValue({
      id: funding.id,
      amount: funding.amount,
      mode: funding.mode,
      paymentAuth: funding.paymentAuth,
      bounties: funding.bounties,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const funding = this.createFromForm();
    if (funding.id !== undefined) {
      this.subscribeToSaveResponse(this.fundingService.update(funding));
    } else {
      this.subscribeToSaveResponse(this.fundingService.create(funding));
    }
  }

  private createFromForm(): IFunding {
    return {
      ...new Funding(),
      id: this.editForm.get(['id'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      mode: this.editForm.get(['mode'])!.value,
      paymentAuth: this.editForm.get(['paymentAuth'])!.value,
      bounties: this.editForm.get(['bounties'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFunding>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IBounties): any {
    return item.id;
  }
}
