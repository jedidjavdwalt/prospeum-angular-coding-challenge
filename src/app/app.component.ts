import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { Question } from './app.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AppService],
})
export class AppComponent implements OnInit {
  title = 'prospeum-angular-coding-challenge';
  questionnaire: Question[] = [];

  checkedRadio(questionId: string, optionId: string) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    return question?.answers[0] === optionId;
  }

  changeRadio(questionId: string, optionId: string) {
    console.log('changeRadio');
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    if (!!question) {
      question.answers = [optionId];

      this.appService
        .updateIsTriggered(this.questionnaire)
        .subscribe((data) => (this.questionnaire = data));
    }
  }

  checkedCheckbox(questionId: string, optionId: string) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    return question?.answers.includes(optionId);
  }

  changeCheckbox(questionId: string, optionId: string) {
    console.log('changeCheckbox');
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    if (!!question) {
      let answer = question.answers;
      answer = answer.includes(optionId)
        ? answer.filter((temp) => temp !== optionId)
        : [...answer, optionId];
      question.answers = answer;

      this.appService
        .updateIsTriggered(this.questionnaire)
        .subscribe((data) => (this.questionnaire = data));
    }
  }

  changeTextarea(questionId: string, event: Event) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    if (!!question) {
      question.answers = [(event.target as HTMLTextAreaElement).value];

      this.appService
        .updateIsTriggered(this.questionnaire)
        .subscribe((data) => (this.questionnaire = data));
    }
  }

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService
      .getQuestionnaire()
      .subscribe((data) => (this.questionnaire = data));
  }
}
