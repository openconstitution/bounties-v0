import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProfile, Profile } from 'app/shared/model/profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'jhi-profile-update',
  templateUrl: './profile-update.component.html',
})
export class ProfileUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    votes: [],
    profilelink: [],
    about: [],
    walletaddress: [],
    userId: [],
    githubEmail: [],
    githubOrgName: [],
  });

  constructor(protected profileService: ProfileService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profile }) => {
      this.updateForm(profile);
    });
  }

  updateForm(profile: IProfile): void {
    this.editForm.patchValue({
      id: profile.id,
      votes: profile.votes,
      profilelink: profile.profilelink,
      about: profile.about,
      walletaddress: profile.walletaddress,
      userId: profile.userId,
      githubEmail: profile.githubEmail,
      githubOrgName: profile.githubOrgName,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profile = this.createFromForm();
    if (profile.id !== undefined) {
      this.subscribeToSaveResponse(this.profileService.update(profile));
    } else {
      this.subscribeToSaveResponse(this.profileService.create(profile));
    }
  }

  private createFromForm(): IProfile {
    return {
      ...new Profile(),
      id: this.editForm.get(['id'])!.value,
      votes: this.editForm.get(['votes'])!.value,
      profilelink: this.editForm.get(['profilelink'])!.value,
      about: this.editForm.get(['about'])!.value,
      walletaddress: this.editForm.get(['walletaddress'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      githubEmail: this.editForm.get(['githubEmail'])!.value,
      githubOrgName: this.editForm.get(['githubOrgName'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfile>>): void {
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
}
