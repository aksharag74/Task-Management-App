import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Users } from "../models/user.model";

@Injectable({providedIn:'root'})
export class AuthService{
    constructor (private storage: StorageService){}
    login(email:string, password:string): boolean{
        const users=this.storage.get<Users>('users');
        const user=users.find(
            u=>u.email === email && u.password === password
        );
        if (user){
            this.storage.setItem('currentUser',user);
            return true;
        }
        return false;
    }
    logout(){
        this.storage.remove('currentUser');
    }
    getCurrentUser(): Users | null {
        return this.storage.getItem<Users>('currentUser');
    }
    isLoggedIn(): boolean{
        return !!this.getCurrentUser();
    }
}


