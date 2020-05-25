import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IBounties } from 'app/shared/model/bounties.model';

type EntityResponseType = HttpResponse<IBounties>;
type EntityArrayResponseType = HttpResponse<IBounties[]>;

@Injectable({ providedIn: 'root' })
export class BountiesService {
  public resourceUrl = SERVER_API_URL + 'api/bounties';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/bounties';

  constructor(protected http: HttpClient) {}

  create(bounties: IBounties): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bounties);
    return this.http
      .post<IBounties>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(bounties: IBounties): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bounties);
    return this.http
      .put<IBounties>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBounties>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBounties[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBounties[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(bounties: IBounties): IBounties {
    const copy: IBounties = Object.assign({}, bounties, {
      expires: bounties.expires && bounties.expires.isValid() ? bounties.expires.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((bounties: IBounties) => {
        bounties.expires = bounties.expires ? moment(bounties.expires) : undefined;
      });
    }
    return res;
  }
}
