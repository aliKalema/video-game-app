import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";
import { environment as env } from  'src/environments/environment';
import {Game} from "../modeles/game";
import {APIResponse} from "../modeles/apiresponse";

@Injectable({
  providedIn: 'root'
})
export class GameHttpService {

  constructor(private httpClient: HttpClient) { }

  public getGameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params =  new HttpParams();
    if(search) {
      params.set('ordering', ordering).set('search', search);
    }
    return this.httpClient.get<APIResponse<Game>>(`${env.BASE_URL}/games`,{params: params});
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.httpClient.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.httpClient.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.httpClient.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
