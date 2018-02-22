import SweetScroll from 'sweet-scroll';
import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { Answer} from '../answer/answer.model';
import { Question } from "../question/question.model";
import { User } from '../auth/user.model';
import { QuestionService } from "../question/question.service";

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
    sweetScroll: SweetScroll;

    constructor(private questionService: QuestionService) {
        this.sweetScroll = SweetScroll.create();
    }

    onSubmit(form: NgForm) {
        const answer = new Answer(
            form.value.description,
            this.question
        );
        this.questionService.addAnswer(answer)
                .subscribe(
                    a => {
                        this.question.answers.unshift(a)
                        this.sweetScroll.to('#title')
                    },
                    error => console.log(error)
                )
        form.resetForm();
    }
};