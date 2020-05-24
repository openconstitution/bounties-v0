import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<IBounties>(this.resourceUrl, bounties, { observe: 'response' });
  }

  update(bounties: IBounties): Observable<EntityResponseType> {
    return this.http.put<IBounties>(this.resourceUrl, bounties, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBounties>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBounties[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBounties[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
