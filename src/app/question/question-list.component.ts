import { Component } from '@angular/core';
import { Question } from './question.model';

const q = new Question(
    '¿Como es una pregunta?',
    'Esta es mi pregunta...',
    new Date(),
    'devicon-android-plain'
);

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styles: [
        
    ]
})

export class QuestionListComponent{
    questions: Question[] = new Array(10).fill(q);
};