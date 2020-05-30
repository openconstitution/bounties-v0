import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BountyTestModule } from '../../../test.module';
import { BountyUpdateComponent } from 'app/entities/bounty/bounty-update.component';
import { BountyService } from 'app/entities/bounty/bounty.service';
import { Bounty } from 'app/shared/model/bounty.model';

describe('Component Tests', () => {
  describe(' Management Update Component', () => {
    let comp: BountyUpdateComponent;
    let fixture: ComponentFixture<BountyUpdateComponent>;
    let service: BountyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BountyTestModule],
        declarations: [BountyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BountyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BountyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BountyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bounty(123);
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
        const entity = new Bounty();
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
