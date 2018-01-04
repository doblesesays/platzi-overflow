import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { Answer} from '../answer/answer.model';
import { Question } from "../question/question.model";
import { User } from '../auth/user.model';

@Component({
    selector: 'app-answer-form',
    templateUrl: './answer-form.component.html',
    styles: [`
        form {
            margin-top: 20px;
        }
    `]
})

export class AnswerFormComponent{
    @Input() question: Question;
    onSubmit(form: NgForm) {
        const answer = new Answer(
            form.value.description,
            this.question,
            new Date,
            new User('eldiego@gmail.cmo', 'somedummypassword', 'Diego', 'Ramirez')
        );
        this.question.answers.unshift(answer);
        form.reset();
    }
};