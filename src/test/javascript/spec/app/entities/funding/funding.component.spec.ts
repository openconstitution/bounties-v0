import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BountiesTestModule } from '../../../test.module';
import { FundingComponent } from 'app/entities/funding/funding.component';
import { FundingService } from 'app/entities/funding/funding.service';
import { Funding } from 'app/shared/model/funding.model';

describe('Component Tests', () => {
  describe('Funding Management Component', () => {
    let comp: FundingComponent;
    let fixture: ComponentFixture<FundingComponent>;
    let service: FundingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BountiesTestModule],
        declarations: [FundingComponent],
      })
        .overrideTemplate(FundingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FundingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FundingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Funding(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fundings && comp.fundings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
