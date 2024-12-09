import { Routes } from '@angular/router';
import { ListTabsAdComponent } from './components/Admin/list-tabs-ad/list-tabs-ad.component';
import { ListSurveyAdComponent } from './components/Admin/list-tabs-ad/list-survey-ad/list-survey-ad.component';
import { ListTopicAdComponent } from './components/Admin/list-tabs-ad/list-topic-ad/list-topic-ad.component';
import { ListSeacchComponent } from './components/User/list-page/list-search/list-search.component';
import { ListRespondComponent } from './components/User/list-respond/list-respond.component';
import { ListPreviewComponent } from './components/User/list-preview/list-preview.component';
import { ListStatsComponent } from './components/User/list-stats/list-stats.component';
import { ListLogInAdComponent } from './components/Admin/list-log-in-ad/list-log-in-ad.component';
import { ListPreviewAdComponent } from './components/Admin/list-tabs-ad/list-preview-ad/list-preview-ad.component';
import { ListFeedbackAdComponent } from './components/Admin/list-tabs-ad/list-feedback-ad/list-feedback-ad.component';
import { ListFeedbackPreAdComponent } from './components/Admin/list-feedback-pre-ad/list-feedback-pre-ad.component';

export const routes: Routes = [
   { path: '', redirectTo:'/list-search', pathMatch:'full' },
   { path: 'list-search', component: ListSeacchComponent },
   { path: 'list-respond', component: ListRespondComponent },
   { path: 'list-preview', component: ListPreviewComponent },
   { path: 'list-stats', component: ListStatsComponent },
   { path: 'list-logIn-ad', component: ListLogInAdComponent },
   { path: 'list-preview-ad', component: ListPreviewAdComponent},
   { path: 'list-feedback-pre-ad', component: ListFeedbackPreAdComponent},
   { path: 'list-tabs-ad', component: ListTabsAdComponent,
     children: [
      { path: 'list-survey-ad', component: ListSurveyAdComponent },
      { path: 'list-topic-ad', component: ListTopicAdComponent },
      { path: 'list-feedback-ad', component: ListFeedbackAdComponent },
      { path: 'list-stats', component: ListStatsComponent },
     ]
    }
];
