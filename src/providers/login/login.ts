import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Resobject } from '../../models/Resobject';
import { config } from '../../config/config';
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  	base_url = config.base_url;

  constructor(
    public http: Http) {
  }

  login(email: string, password: string): Observable<Resobject> {
	    // headers.append('Access-Control-Allow-Origin','*');
	    let headers = new Headers({'Content-Type': 'application/json'});  
 		  let options = new RequestOptions({headers: headers});
      const body = {email: email, password:password};

	    return this.http.post(`${this.base_url}/user/login`,body,options)
	    	.map(this.extractData)
	    	.catch(this.handleErrorObservable); 
	}

  savetoken(user_id: number, token: string): Observable<Resobject> {
      // headers.append('Access-Control-Allow-Origin','*');
      let headers = new Headers({'Content-Type': 'application/json'});  
      let options = new RequestOptions({headers: headers});
      const body = {user_id: user_id, token:token};

      return this.http.post(`${this.base_url}/user/savetoken`,body,options)
        .map(this.extractData)
        .catch(this.handleErrorObservable); 
  }

  removeToken(user_id: number, token: string): Observable<Resobject> {
      // headers.append('Access-Control-Allow-Origin','*');
      let headers = new Headers({'Content-Type': 'application/json'});  
      let options = new RequestOptions({headers: headers});
      const body = {user_id: user_id, token:token};

      return this.http.post(`${this.base_url}/user/removetoken`,body,options)
        .map(this.extractData)
        .catch(this.handleErrorObservable); 
  }

  updatetoken(user_id: number, old_token: string,new_token: string): Observable<Resobject> {
      // headers.append('Access-Control-Allow-Origin','*');
      let headers = new Headers({'Content-Type': 'application/json'});  
      let options = new RequestOptions({headers: headers});
      const body = {user_id: user_id, old_token:old_token,new_token: new_token};

      return this.http.post(`${this.base_url}/user/updatetoken`,body,options)
        .map(this.extractData)
        .catch(this.handleErrorObservable); 
  }

  private extractData(res: Response) {
		let body = res.json();
        return body || {};
  }

  private handleErrorObservable (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
  }

}
