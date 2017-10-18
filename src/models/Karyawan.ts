// User model based on the structure of github api at
// https://api.github.com/users/{username}
export class Karyawan {
 	p_karyawan_id: number;
 	user_id: number;
 	nik: string;
 	nama: string;
 	email_perusahaan: string;
 	tgl_bergabung: string;
 	constructor() { 
   	}	
}