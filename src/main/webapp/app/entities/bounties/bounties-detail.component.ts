import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBounties } from 'app/shared/model/bounties.model';

@Component({
  selector: 'jhi-bounties-detail',
  templateUrl: './bounties-detail.component.html',
})
export class BountiesDetailComponent implements OnInit {
  bounties: IBounties | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bounties }) => (this.bounties = bounties));
  }

  previousState(): void {
    window.history.back();
  }
}
