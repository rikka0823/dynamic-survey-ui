import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AccessService {
  private isAdmin: boolean;

  constructor() {
    const storedIsAdmin = sessionStorage.getItem('isAdmin');
    this.isAdmin = storedIsAdmin ? JSON.parse(storedIsAdmin) : false;
  }

  // 獲取登入狀態
  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  // 設定登入狀態
  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
    sessionStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }

  // 清除登入狀態
  clearIsAdmin() {
    this.isAdmin = false;
    sessionStorage.removeItem('isAdmin');
  }
}
