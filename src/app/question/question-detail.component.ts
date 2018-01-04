import { Component } from '@angular/core';
import { Question } from './question.model';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css']
})

export class QuestionDetailComponent {
    question: Question = new Question(
        'Esta es una pregunta',
        "Esta es la descripcion de la pregunta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque nibh quis malesuada tincidunt. Etiam consectetur venenatis risus nec tincidunt. Nam et lacus bibendum, scelerisque libero suscipit, aliquet libero. Nullam vel ullamcorper lacus, quis venenatis orci. Phasellus at libero ligula. Duis et pulvinar purus, a euismod nunc. Nunc sit amet posuere quam. Nulla iaculis, purus blandit elementum ornare, dolor lorem interdum felis, in sagittis mauris massa at enim.",
        new Date,
        'devicon-android-plain' 
    );

}