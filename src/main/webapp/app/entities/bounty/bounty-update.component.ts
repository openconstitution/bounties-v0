import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBounty, Bounty } from 'app/shared/model/bounty.model';
import { BountyService } from './bounty.service';
import { IIssue } from 'app/shared/model/issue.model';
import { IssueService } from 'app/entities/issue/issue.service';

@Component({
  selector: 'jhi-bounty-update',
  templateUrl: './bounty-update.component.html',
})
export class BountyUpdateComponent implements OnInit {
  isSaving = false;
  issues: IIssue[] = [];
  expiresDp: any;

  editForm = this.fb.group({
    id: [],
    status: [],
    url: [],
    amount: [],
    experience: [],
    commitment: [],
    type: [],
    category: [],
    keywords: [],
    permission: [],
    expires: [],
    issue: [],
  });

  constructor(
    protected bountyService: bountyService,
    protected issueService: IssueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bounty }) => {
      this.updateForm(bounty);

      this.issueService
        .query({ filter: 'bounty-is-null' })
        .pipe(
          map((res: HttpResponse<IIssue[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IIssue[]) => {
          if (!bounty.issue || !bounty.issue.id) {
            this.issues = resBody;
          } else {
            this.issueService
              .find(bounty.issue.id)
              .pipe(
                map((subRes: HttpResponse<IIssue>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IIssue[]) => (this.issues = concatRes));
          }
        });
    });
  }

  updateForm(bounty: IBounty): void {
    this.editForm.patchValue({
      id: bounty.id,
      status: bounty.status,
      url: bounty.url,
      amount: bounty.amount,
      experience: bounty.experience,
      commitment: bounty.commitment,
      type: bounty.type,
      category: bounty.category,
      keywords: bounty.keywords,
      permission: bounty.permission,
      expires: bounty.expires,
      issue: bounty.issue,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bounty = this.createFromForm();
    if (bounty.id !== undefined) {
      this.subscribeToSaveResponse(this.bountyService.update(bounty));
    } else {
      this.subscribeToSaveResponse(this.bountyService.create(bounty));
    }
  }

  private createFromForm(): IBounty {
    return {
      ...new Bounty(),
      id: this.editForm.get(['id'])!.value,
      status: this.editForm.get(['status'])!.value,
      url: this.editForm.get(['url'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      experience: this.editForm.get(['experience'])!.value,
      commitment: this.editForm.get(['commitment'])!.value,
      type: this.editForm.get(['type'])!.value,
      category: this.editForm.get(['category'])!.value,
      keywords: this.editForm.get(['keywords'])!.value,
      permission: this.editForm.get(['permission'])!.value,
      expires: this.editForm.get(['expires'])!.value,
      issue: this.editForm.get(['issue'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBounty>>): void {
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

  trackById(index: number, item: IIssue): any {
    return item.id;
  }
}
