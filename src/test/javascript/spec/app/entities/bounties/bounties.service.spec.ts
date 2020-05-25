import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { BountiesService } from 'app/entities/bounties/bounties.service';
import { IBounties, Bounties } from 'app/shared/model/bounties.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Type } from 'app/shared/model/enumerations/type.model';
import { Category } from 'app/shared/model/enumerations/category.model';

describe('Service Tests', () => {
  describe('Bounties Service', () => {
    let injector: TestBed;
    let service: BountiesService;
    let httpMock: HttpTestingController;
    let elemDefault: IBounties;
    let expectedResult: IBounties | IBounties[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(BountiesService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Bounties(
        0,
        Status.OPEN,
        'AAAAAAA',
        0,
        Experience.BEGINNER,
        0,
        Type.BUG,
        Category.FRONT_END,
        'AAAAAAA',
        false,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            expires: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Bounties', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            expires: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expires: currentDate,
          },
          returnedFromService
        );

        service.create(new Bounties()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Bounties', () => {
        const returnedFromService = Object.assign(
          {
            status: 'BBBBBB',
            url: 'BBBBBB',
            amount: 1,
            experience: 'BBBBBB',
            commitment: 1,
            type: 'BBBBBB',
            category: 'BBBBBB',
            keywords: 'BBBBBB',
            permission: true,
            expires: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expires: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Bounties', () => {
        const returnedFromService = Object.assign(
          {
            status: 'BBBBBB',
            url: 'BBBBBB',
            amount: 1,
            experience: 'BBBBBB',
            commitment: 1,
            type: 'BBBBBB',
            category: 'BBBBBB',
            keywords: 'BBBBBB',
            permission: true,
            expires: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expires: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Bounties', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
