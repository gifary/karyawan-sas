import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { Resobject } from '../../models/resobject';
import { ResArray } from '../../models/ResArray';
import { config } from '../../config/config';
/*
  Generated class for the KaryawanProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KaryawanProvider {
	
  base_url = config.base_url;
	api_key = config.api_key;

  constructor(public http: Http) {
    	console.log('Hello KaryawanProvider Provider');
  }

  login(email: string, password: string): Observable<Resobject> {
	    // headers.append('Access-Control-Allow-Origin','*');
	    let headers = new Headers({'Content-Type': 'application/json'});  
 		  headers.append('Authorization','Bearer '+this.api_key);
      let options = new RequestOptions({headers: headers});
      const body = {email: email, password:password};

	    return this.http.post(`${this.base_url}/user/login`,body,options)
	    	.map(this.extractData)
	    	.catch(this.handleErrorObservable); 
	}

  jenisIzin(tipe:number): Observable<Resobject>{
    let headers = new Headers({'Content-Type': 'application/json'});  
     headers.append('Authorization','Bearer '+this.api_key);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.base_url}/jenis-permit`,options)
      .map(this.extractData)
      .catch(this.handleErrorObservable); 
  }

  listKaryawan(m_lokasi_id:number): Observable<Resobject>{
    let headers = new Headers({'Content-Type': 'application/json'});  
     headers.append('Authorization','Bearer '+this.api_key);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.base_url}/karyawan/get-data-karyawan-by-lokasi/`+m_lokasi_id,options)
      .map(this.extractData)
      .catch(this.handleErrorObservable); 
  }

  storePermit(form:NgForm): Observable<Resobject> {
      // headers.append('Access-Control-Allow-Origin','*');
      let headers = new Headers({'Content-Type': 'application/json'});  
      headers.append('Authorization','Bearer '+this.api_key);
      let options = new RequestOptions({headers: headers});

      const body = JSON.stringify(form.value);
      
      return this.http.post(`${this.base_url}/permit`,body,options)
        .map(this.extractData)
        .catch(this.handleErrorObservable); 
  }

  listPermit(p_karyawan_id:number): Observable<ResArray>{
    let headers = new Headers({'Content-Type': 'application/json'});  
     headers.append('Authorization','Bearer '+this.api_key);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.base_url}/get-list-permit/`+p_karyawan_id,options)
      .map(this.extractData)
      .catch(this.handleErrorObservable); 
  }

  private extractData(res: Response) {
		let body = res.json();
        return body || {};
  }

  private handleErrorObservable (error: Response | any) {
		console.error(error.message || error);
    console.log("masuk error");
		return Observable.throw(error.message || error);
  }
}
