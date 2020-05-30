import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BountyTestModule } from '../../../test.module';
import { FundingDetailComponent } from 'app/entities/funding/funding-detail.component';
import { Funding } from 'app/shared/model/funding.model';

describe('Component Tests', () => {
  describe('Funding Management Detail Component', () => {
    let comp: FundingDetailComponent;
    let fixture: ComponentFixture<FundingDetailComponent>;
    const route = ({ data: of({ funding: new Funding(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BountyTestModule],
        declarations: [FundingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FundingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FundingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load funding on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.funding).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
