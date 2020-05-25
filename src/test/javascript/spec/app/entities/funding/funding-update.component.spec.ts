import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BountiesTestModule } from '../../../test.module';
import { FundingUpdateComponent } from 'app/entities/funding/funding-update.component';
import { FundingService } from 'app/entities/funding/funding.service';
import { Funding } from 'app/shared/model/funding.model';

describe('Component Tests', () => {
  describe('Funding Management Update Component', () => {
    let comp: FundingUpdateComponent;
    let fixture: ComponentFixture<FundingUpdateComponent>;
    let service: FundingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BountiesTestModule],
        declarations: [FundingUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FundingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FundingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FundingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Funding(123);
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
        const entity = new Funding();
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
