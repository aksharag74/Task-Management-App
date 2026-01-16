import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class StorageService{
    //get the data 
    get<T>(key:string): T[]{ //T is the function that works with any data types
        return JSON.parse(localStorage.getItem(key)||'[]');
    }
    //save the data
    set<T>(key:string, data: T[]):void {
        localStorage.setItem(key, JSON.stringify(data));
    }
    getItem<T>(key:string): T | null{
        return JSON.parse(localStorage.getItem(key) ||'null');
    }
    setItem<T>(key:string, data:T):void {
        localStorage.setItem(key, JSON.stringify(data));
        //stringyify covert the data stored into the text 
    }
    remove(key:string):void{
        localStorage.removeItem(key);
    }
}


