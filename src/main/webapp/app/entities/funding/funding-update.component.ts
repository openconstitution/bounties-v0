import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFunding, Funding } from 'app/shared/model/funding.model';
import { FundingService } from './funding.service';
import { IBounty } from 'app/shared/model/bounty.model';
import { BountyService } from 'app/entities/bounty/bounty.service';

@Component({
  selector: 'jhi-funding-update',
  templateUrl: './funding-update.component.html',
})
export class FundingUpdateComponent implements OnInit {
  isSaving = false;
  bounty: IBounty[] = [];

  editForm = this.fb.group({
    id: [],
    amount: [],
    mode: [],
    paymentAuth: [],
    bounty: [],
  });

  constructor(
    protected fundingService: FundingService,
    protected bountyService: BountyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ funding }) => {
      this.updateForm(funding);

      this.bountyService.query().subscribe((res: HttpResponse<IBounty[]>) => (this.bounty = res.body || []));
    });
  }

  updateForm(funding: IFunding): void {
    this.editForm.patchValue({
      id: funding.id,
      amount: funding.amount,
      mode: funding.mode,
      paymentAuth: funding.paymentAuth,
      bounty: funding.bounty,
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
      bounty: this.editForm.get(['bounty'])!.value,
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

  trackById(index: number, item: IBounty): any {
    return item.id;
  }
}
