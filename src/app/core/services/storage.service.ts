import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class StorageService{
    //get the data 
    get<T>(key:string): T|null{ //T is the function that works with any data types
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    //save the data
    set<T>(key:string, data: T):void {
        localStorage.setItem(key, JSON.stringify(data));
    }
    remove(key:string):void{
        localStorage.removeItem(key);
    }
}


