import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from '../../../@services/access.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-log-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-log-in-ad.component.html',
  styleUrl: './list-log-in-ad.component.scss'
})
export class ListLogInAdComponent {
  email!: string;
  password!: string;
  login!: Login;


  constructor(
    private router: Router,
    private accessService: AccessService,
    private http: HttpClient
  ) { }

  navigateToList() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.http.post<Login>('/api/account/login', user).subscribe({
      next: (result: Login) => {
        if (result.code != '200') {
          alert('請重新輸入電子郵件、密碼');
          return;
        }

        this.accessService.setIsAdmin(true);
        this.router.navigate(['/list-search']);
        alert('成功登入');
      },
      error: (error) => {
        alert('請重新輸入電子郵件、密碼');
      }
    });
  }
}

interface User {
  email: string;
  password: string;
}

interface Login {
  code: string;
  message: string;
}
