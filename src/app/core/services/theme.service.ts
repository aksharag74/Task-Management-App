import { Injectable } from "@angular/core";
 
@Injectable({
    providedIn:'root',
})
export class ThemeService{
    private storagekey='theme';
    initTheme(){
        const savedItem=localStorage.getItem(this.storagekey);
        if(savedItem === 'dark'){
            document.body.classList.add('dark-theme');
        }else{
            document.body.classList.remove('dark-theme');
        }
    }
    toggleTheme(){
        document.body.classList.toggle('dark-theme');
        const isDark=document.body.classList.contains('dark-theme');
        localStorage.setItem(this.storagekey, isDark? 'dark' : 'light');
    }
    isDarkMode():boolean{
        return document.body.classList.contains('dark-theme');
    }
}