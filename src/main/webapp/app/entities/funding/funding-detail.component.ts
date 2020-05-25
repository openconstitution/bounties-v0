import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFunding } from 'app/shared/model/funding.model';

@Component({
  selector: 'jhi-funding-detail',
  templateUrl: './funding-detail.component.html',
})
export class FundingDetailComponent implements OnInit {
  funding: IFunding | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ funding }) => (this.funding = funding));
  }

  previousState(): void {
    window.history.back();
  }
}
