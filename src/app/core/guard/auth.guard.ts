import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({ providedIn:'root'})
//canActivate tells whether the user is allowed to aacces the page 
export class AuthGuard implements CanActivate{
    constructor(private auth: AuthService, private router:Router){}
    canActivate():boolean{
        if(!this.auth.isLoggedIn()){
            this.router.navigate(['/login']);
            return true;
        }
        return false;
    }
}


