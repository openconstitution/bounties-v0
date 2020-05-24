import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BountiesTestModule } from '../../../test.module';
import { BountiesDetailComponent } from 'app/entities/bounties/bounties-detail.component';
import { Bounties } from 'app/shared/model/bounties.model';

describe('Component Tests', () => {
  describe('Bounties Management Detail Component', () => {
    let comp: BountiesDetailComponent;
    let fixture: ComponentFixture<BountiesDetailComponent>;
    const route = ({ data: of({ bounties: new Bounties(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BountiesTestModule],
        declarations: [BountiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BountiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BountiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bounties on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bounties).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
