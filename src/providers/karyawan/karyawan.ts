import { Injectable,OnInit } from '@angular/core';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { Resobject } from '../../models/Resobject';
import { ResArray } from '../../models/ResArray';
import { config } from '../../config/config';
import { LocalStorageService } from 'angular-2-local-storage';
/*
  Generated class for the KaryawanProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KaryawanProvider implements OnInit {
	
  base_url = config.base_url;
	private api_key: string;

  constructor(
    public http: Http,
    public localStorageService: LocalStorageService) {
    this.api_key= this.localStorageService.get("api_token")+"";
  }
  
  ngOnInit(){
    this.api_key= this.localStorageService.get("api_token")+"";

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

  listSecurity(m_lokasi_id:number): Observable<Resobject>{
    let headers = new Headers({'Content-Type': 'application/json'});  
     headers.append('Authorization','Bearer '+this.api_key);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.base_url}/karyawan/get-data-security-by-lokasi/`+m_lokasi_id,options)
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

  listTerlambat(m_lokasi_id:number): Observable<ResArray>{
    let headers = new Headers({'Content-Type': 'application/json'});  
     headers.append('Authorization','Bearer '+this.api_key);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.base_url}/get-list-terlambat/`+m_lokasi_id,options)
      .map(this.extractData)
      .catch(this.handleErrorObservable); 
  }

  listProsesPermit(p_karyawan_id:number): Observable<ResArray>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    headers.append('Authorization','Bearer '+this.api_key);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.base_url}/get-list-permit-proses/`+p_karyawan_id,options)
      .map(this.extractData)
      .catch(this.handleErrorObservable); 
  }

  listSession(p_karyawan_id:number): Observable<ResArray>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    headers.append('Authorization','Bearer '+this.api_key);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.base_url}/session/getlist-by-karyawan/`+p_karyawan_id,options)
      .map(this.extractData)
      .catch(this.handleErrorObservable); 
  }

  updatePermit(status_persetujuan:number,t_permit_id:number){
    let headers = new Headers({'Content-Type': 'application/json'});  
    headers.append('Authorization','Bearer '+this.api_key);
    headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    let options = new RequestOptions({headers: headers});
    console.log(status_persetujuan);
    const body = {status_persetujuan: status_persetujuan};

    return this.http.put(`${this.base_url}/permit/`+t_permit_id,body,options)
      .map(this.extractData)
      .catch(this.handleErrorObservable); 
  }

  listAbsen(no_absen:number,p_karyawan_id:number): Observable<Resobject>{
    let headers = new Headers({'Content-Type': 'application/json'});  
     headers.append('Authorization','Bearer '+this.api_key);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.base_url}/get-list-absen/`+no_absen+'/'+p_karyawan_id,options)
      .map(this.extractData)
      .catch(this.handleErrorObservable); 
  }

  listReSchedule(p_karyawan_id:number,status_mod:number): Observable<ResArray>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    headers.append('Authorization','Bearer '+this.api_key);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.base_url}/get-list-reschedule/`+status_mod+`/`+p_karyawan_id,options)
      .map(this.extractData)
      .catch(this.handleErrorObservable); 
  }

  listProsesReschedule(p_karyawan_id:number): Observable<ResArray>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    headers.append('Authorization','Bearer '+this.api_key);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.base_url}/get-list-reschedule-approval/`+p_karyawan_id,options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  storeReschedule(form:NgForm): Observable<Resobject> {
      // headers.append('Access-Control-Allow-Origin','*');
      let headers = new Headers({'Content-Type': 'application/json'});  
      headers.append('Authorization','Bearer '+this.api_key);
      let options = new RequestOptions({headers: headers});

      const body = JSON.stringify(form.value);
      
      return this.http.post(`${this.base_url}/reschedule`,body,options)
        .map(this.extractData)
        .catch(this.handleErrorObservable); 
  }

  listShift(): Observable<Resobject>{
    let headers = new Headers({'Content-Type': 'application/json'});  
    headers.append('Authorization','Bearer '+this.api_key);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.base_url}/shift`,options)
      .map(this.extractData)
      .catch(this.handleErrorObservable); 
  }

  updateReschedule(status_persetujuan:number,t_reschedule_id:number){
    let headers = new Headers({'Content-Type': 'application/json'});  
    headers.append('Authorization','Bearer '+this.api_key);
    headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    let options = new RequestOptions({headers: headers});
    const body = {status_persetujuan: status_persetujuan};

    return this.http.put(`${this.base_url}/reschedule/`+t_reschedule_id,body,options)
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
