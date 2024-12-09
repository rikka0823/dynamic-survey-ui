import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AccessService {
  // 管理權限狀態
  // private isAdmin = false;
  private isAdmin: boolean;

  constructor() {
    const storedIsAdmin = sessionStorage.getItem('isAdmin');
    this.isAdmin = storedIsAdmin ? JSON.parse(storedIsAdmin) : false;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
    sessionStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }


  clearIsAdmin() {
    this.isAdmin = false;
    sessionStorage.removeItem('isAdmin');
  }

}

