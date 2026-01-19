import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Users } from "../models/user.model";

@Injectable({providedIn:'root'})
export class AuthService{
    constructor (private storage: StorageService){}
    register(name: string, email: string, password: string): boolean {
  const users = this.storage.get<Users[]>("users") || [];

  const exists = users.some((u) => u.email === email);
  if (exists) return false;

  const newUser: Users = {
    id: Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);
  this.storage.set("users", users);
  return true;
}
    login(email:string, password:string): boolean{
        const users=this.storage.get<Users[]>('users')||[];
        const user=users.find(
            (u)=>u.email === email && u.password === password
        );
        if (user){
            this.storage.set('user',user);
            return true;
        }
        return false;
    }
    logout():void{
        this.storage.remove('user');
    }
    getCurrentUser(): Users | null {
        return this.storage.get<Users>('user');
    }
    isLoggedIn(): boolean{
        return !!this.getCurrentUser();
    }
}


