import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {

  private baseURL = environment.apiBase;

  constructor(private http: HttpClient) {}

  getShows(query: string = '') {
    if (query) {
      return this.http.get<any[]>(`${this.baseURL}/search/shows?q=${query}`);
    } else {
      return this.http.get<any[]>(`${this.baseURL}/shows`);
    }
  }

  getShowDetails(id: number) {
    return this.http.get(`${this.baseURL}/shows/${id}`);
  }
}
