import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IBounty } from 'app/shared/model/bounty.model';

type EntityResponseType = HttpResponse<IBounty>;
type EntityArrayResponseType = HttpResponse<IBounty[]>;

@Injectable({ providedIn: 'root' })
export class BountyService {
  public resourceUrl = SERVER_API_URL + 'api/bounties';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/bounties';

  constructor(protected http: HttpClient) {}

  create(bounty: IBounty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bounty);
    return this.http
      .post<IBounty>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(bounty: IBounty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bounty);
    return this.http
      .put<IBounty>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBounty>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBounty[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBounty[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(bounty: IBounty): IBounty {
    const copy: IBounty = Object.assign({}, bounty, {
      expires: bounty.expires && bounty.expires.isValid() ? bounty.expires.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.expires = res.body.expires ? moment(res.body.expires) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((bounty: IBounty) => {
        bounty.expires = bounty.expires ? moment(bounty.expires) : undefined;
      });
    }
    return res;
  }
}
