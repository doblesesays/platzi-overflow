import { Router } from '@angular/router';
import * as SmoothScroll from'smooth-scroll';
import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { Answer} from '../answer/answer.model';
import { Question } from "../question/question.model";
import { User } from '../auth/user.model';
import { QuestionService } from "../question/question.service";
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-answer-form',
    templateUrl: './answer-form.component.html',
    styles: [`
        form {
            margin-top: 20px;
        }
    `],
    providers: [QuestionService]
})

export class AnswerFormComponent{
    @Input() question: Question;
    smoothScroll: SmoothScroll;

    constructor(
        private questionService: QuestionService,
        private authService: AuthService,
        private router: Router,
    ) {
        this.smoothScroll = SmoothScroll();
    }

    onSubmit(form: NgForm) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/signin');
        }
        const answer = new Answer(
            form.value.description,
            this.question
        );
        this.questionService.addAnswer(answer)
                .subscribe(
                    a => {
                        this.question.answers.unshift(a)
                        const anchor = document.querySelector( '#title' )
                        this.smoothScroll.animateScroll(anchor)
                    },
                    this.authService.handleError,
                );
        form.resetForm();
    }
};