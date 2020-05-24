import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BountiesTestModule } from '../../../test.module';
import { BountiesComponent } from 'app/entities/bounties/bounties.component';
import { BountiesService } from 'app/entities/bounties/bounties.service';
import { Bounties } from 'app/shared/model/bounties.model';

describe('Component Tests', () => {
  describe('Bounties Management Component', () => {
    let comp: BountiesComponent;
    let fixture: ComponentFixture<BountiesComponent>;
    let service: BountiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BountiesTestModule],
        declarations: [BountiesComponent],
      })
        .overrideTemplate(BountiesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BountiesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BountiesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Bounties(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bounties && comp.bounties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
