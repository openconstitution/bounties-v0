import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBounty } from 'app/shared/model/bounty.model';

@Component({
  selector: 'jhi-bounty-detail',
  templateUrl: './bounty-detail.component.html',
})
export class BountyDetailComponent implements OnInit {
  bounty: IBounty | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bounty }) => (this.bounty = bounty));
  }

  previousState(): void {
    window.history.back();
  }
}
