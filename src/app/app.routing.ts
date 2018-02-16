import { SignupScreenComponent } from './auth/signup-screen.component';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { QuestionListComponent } from './question/question-list.component';
import { Routes, RouterModule } from "@angular/router";
import { QUESTION_ROUTES } from "./question/question.routing";

const APP_ROUTES: Routes = [
    {
        path: '', component: QuestionListComponent, pathMatch: 'full'
    },
    {
        path: 'signin', component: SigninScreenComponent
    },
    {
        path: 'signup', component: SignupScreenComponent
    },
    {
        path: 'questions', children: QUESTION_ROUTES
    }
]; 

export const Routing = RouterModule.forRoot(APP_ROUTES);