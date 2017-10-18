import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Resobject } from '../../models/resobject';

/*
  Generated class for the KaryawanProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KaryawanProvider {
	base_url = 'http://hrms.grandtjokro.com/api/v1';
	api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQxZTc1MjRhYjMwMGM4YWU1MDlhNTQ4NzRlZDkwY2Q1OGNiYjRmZTE2NTRjYmNjZmQ0OWEzZTAyMzhiMTUwM2M4ZTExZTRhNGZmZjg5OTdiIn0.eyJhdWQiOiIyNyIsImp0aSI6IjQxZTc1MjRhYjMwMGM4YWU1MDlhNTQ4NzRlZDkwY2Q1OGNiYjRmZTE2NTRjYmNjZmQ0OWEzZTAyMzhiMTUwM2M4ZTExZTRhNGZmZjg5OTdiIiwiaWF0IjoxNTAxMDMwNDgzLCJuYmYiOjE1MDEwMzA0ODMsImV4cCI6MTUzMjU2NjQ4Mywic3ViIjoiNCIsInNjb3BlcyI6W119.Bq9mQ0SvErhftX9rP8NfDRbje2bzBwCq6wO-0kysq6rRa-FChJ3-9KHu-WX7R50sCJwov1TNb4J_gLlS39aowZuPp6Aw-zU51iUQY-VB0hoLVwVlxpXLvwgQ2J6c_Sh3fEC0QEHx_mB9qwfW50Lsn-6IGFw69xvuloj_zBB4kZzibOO_UqUu1IHaSuqY2kpKxSwzJhf35oBnLkHbxapLbfqnYzxbr-f8xW711GrZfxXSb1Ik_1ZyTnTAYe5j-tWufgBHwZ2csUKdtzkrKCiEMJ9dsnVboCuAh37_jgHyRwBLtmL9aAW1M9fiU0etEmLRcw0x2v7yJ3ESb-H5cvG6ch9v1JCMClUEO0zpcHAhIkzLzUjdabKvqprJ_xidvlPE6lvSH8HnuMHb-sXU9ATSZuFOt4r8DEfd2pOdRZSGrZhhajdZuB3uCAoO_9KN75T0igNkcL2GLgzZxxt-C4FHc4L_mIBGwq1k8-KfZEuV_Pd8icErFWaoApvepl95gySHF1FXxGHBINZnUNaGADdccS33R16h8f1TJGnATakpWJnjR8rpzeYYMhk8KOZSS6B1pC3tuFQ8Yw_gNalHAiSU5xeOhmoF7dBZalfAy2Yl6r7I7pK7KIwhNmVA0N_UXJV7u5ofkCHVpsNnLq69aB-XAb-ZglpcQUKthWasyigKhj8';

  	constructor(public http: Http) {
    	console.log('Hello KaryawanProvider Provider');
  	}

  	login(email: string, password: string): Observable<Resobject> {
  		console.log("email "+email);
	    // headers.append('Access-Control-Allow-Origin','*');
	    let headers = new Headers({'Content-Type': 'application/json'});  
 		headers.append('Authorization','Bearer '+this.api_key);

        let options = new RequestOptions({headers: headers});

        const body = {email: email, password:password};

	    return this.http.post(`${this.base_url}/user/login`,body,options)
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
