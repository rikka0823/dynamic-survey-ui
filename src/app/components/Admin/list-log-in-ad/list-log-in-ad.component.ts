import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from '../../../@services/access.service';

@Component({
  selector: 'app-list-log-in',
  standalone: true,
  imports: [],
  templateUrl: './list-log-in-ad.component.html',
  styleUrl: './list-log-in-ad.component.scss'
})
export class ListLogInAdComponent {
  constructor(
    private router: Router,
    private accessService: AccessService
  ){}

  navigateToList() {
    this.accessService.setIsAdmin(true);
    this.router.navigate(['/list-search']);
  }
}
