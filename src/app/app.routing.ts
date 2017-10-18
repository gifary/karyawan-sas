import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    
    //Site routes goes here 
    { 
        path: 'home', 
        component: HomePage
        // children: [
        //   { path: '', component: HomePage, pathMatch: 'full'}
        // ]
    },
  
    //no layout routes
    { path: 'login', component: LoginPage},
];

export const routing = RouterModule.forRoot(appRoutes);
