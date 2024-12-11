import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedBackService } from '../../../@services/feedback.service';

@Component({
  selector: 'app-list-feedback-pre-ad',
  standalone: true,
  imports: [],
  templateUrl: './list-feedback-pre-ad.component.html',
  styleUrl: './list-feedback-pre-ad.component.scss'
})
export class ListFeedbackPreAdComponent {
  preData!: any;
  userName!: string;
  fillinDate!: string;
  email!: string;
  age!: string;
  quizDesc!: string;
  phone!: string;
  quizName!: string;
  questions!: any[];
  answer: string[] = [];
  test!: string;

  constructor(
    private router: Router,
    private feedBackService: FeedBackService
  ) {}

  ngOnInit(): void {
    this.preData = this.feedBackService.feedBackData;
    this.userName = this.preData.userName;
    this.fillinDate = this.preData.fillinDate;
    this.email =  this.preData.email;
    this.age = this.preData.age;
    this.quizDesc = this.preData.quizDesc;
    this.phone =  this.preData.phone;
    this.quizName = this.preData.quizName;
    this.questions = this.preData.questions;

    for (let item of this.questions) {
      this.answer.push(JSON.parse(item.answerStr));
    }
  }

  navigateToAd() {
    this.router.navigate(['/list-tabs-ad/list-feedback-ad'])
  }
}
