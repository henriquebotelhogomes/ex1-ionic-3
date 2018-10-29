import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: HttpClient) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatestMovies() {
    return this.http.get(this.baseApiPath + "/movie/latest?api_key=" + this.getApiKey() + "&language=" +this.getApiLanguage());
  }

  getMovieDetails(filmeid) {
    console.log('teste', filmeid)
    //return this.http.get(this.baseApiPath + "/movie/"+filmeid+"?api_key=" + this.getApiKey() + "&language=" +this.getApiLanguage());
    return this.http.get(this.baseApiPath + `/movie/${filmeid}?api_key=` + this.getApiKey() + "&language=" +this.getApiLanguage());
  }

  getPopularMovies(page = 1) {
    return this.http.get(this.baseApiPath + "/movie/popular?api_key=" + this.getApiKey() + "&language=" +this.getApiLanguage()+"&page="+page);
  }

  getApiKey(): string{
    return '3dac598a3f45dd55b6f0a6565ba9704a';
  }

  getApiLanguage(): string{
    return 'pt-BR';
  }

}
