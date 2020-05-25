import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IFunding } from 'app/shared/model/funding.model';

type EntityResponseType = HttpResponse<IFunding>;
type EntityArrayResponseType = HttpResponse<IFunding[]>;

@Injectable({ providedIn: 'root' })
export class FundingService {
  public resourceUrl = SERVER_API_URL + 'api/fundings';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/fundings';

  constructor(protected http: HttpClient) {}

  create(funding: IFunding): Observable<EntityResponseType> {
    return this.http.post<IFunding>(this.resourceUrl, funding, { observe: 'response' });
  }

  update(funding: IFunding): Observable<EntityResponseType> {
    return this.http.put<IFunding>(this.resourceUrl, funding, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFunding>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFunding[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFunding[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
