import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BountiesTestModule } from '../../../test.module';
import { BountiesUpdateComponent } from 'app/entities/bounties/bounties-update.component';
import { BountiesService } from 'app/entities/bounties/bounties.service';
import { Bounties } from 'app/shared/model/bounties.model';

describe('Component Tests', () => {
  describe('Bounties Management Update Component', () => {
    let comp: BountiesUpdateComponent;
    let fixture: ComponentFixture<BountiesUpdateComponent>;
    let service: BountiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BountiesTestModule],
        declarations: [BountiesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BountiesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BountiesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BountiesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bounties(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bounties();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
