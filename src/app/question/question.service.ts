import { environment } from './../../environments/environment';
import { Question } from './question.model';
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import * as urljoin from 'url-join';

@Injectable()
export class QuestionService {

    private questionsUrl: string;

    constructor(private http:Http) {
        this.questionsUrl = urljoin(environment.apiUrl, 'questions');
    }

    getQuestions(): Promise<void | Question[]> {
        return this.http.get(this.questionsUrl)
            .toPromise()
            .then(response => response.json() as Question[])
            .catch(this.handlerError)
    }

    getQuestion(id): Promise<void | Question> {
        const url = urljoin(this.questionsUrl, id);

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Question)
            .catch(this.handlerError)
    }

    handlerError(error: any) {
        const errMsg = error.message ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        console.log(errMsg);    
    }
}