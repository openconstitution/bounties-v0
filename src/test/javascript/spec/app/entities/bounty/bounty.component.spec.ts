import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BountyTestModule } from '../../../test.module';
import { BountyComponent } from 'app/entities/bounty/bounty.component';
import { BountyService } from 'app/entities/bounty/bounty.service';
import { Bounty } from 'app/shared/model/bounty.model';

describe('Component Tests', () => {
  describe('Bounty Management Component', () => {
    let comp: BountyComponent;
    let fixture: ComponentFixture<BountyComponent>;
    let service: BountyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BountyTestModule],
        declarations: [BountyComponent],
      })
        .overrideTemplate(BountyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BountyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BountyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Bounty(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bounty && comp.bounty[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
