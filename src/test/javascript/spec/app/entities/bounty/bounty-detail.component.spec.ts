import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BountyTestModule } from '../../../test.module';
import { BountyDetailComponent } from 'app/entities/bounty/bounty-detail.component';
import { Bounty } from 'app/shared/model/bounty.model';

describe('Component Tests', () => {
  describe('Bounty Management Detail Component', () => {
    let comp: BountyDetailComponent;
    let fixture: ComponentFixture<BountyDetailComponent>;
    const route = ({ data: of({ bounty: new Bounty(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BountyTestModule],
        declarations: [BountyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BountyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BountyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bounty on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bounty).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
