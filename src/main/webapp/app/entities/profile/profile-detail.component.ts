import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfile } from 'app/shared/model/profile.model';

@Component({
  selector: 'jhi-profile-detail',
  templateUrl: './profile-detail.component.html',
})
export class ProfileDetailComponent implements OnInit {
  profile: IProfile | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profile }) => (this.profile = profile));
  }

  previousState(): void {
    window.history.back();
  }
}
