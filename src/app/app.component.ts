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

  checkedRadio(questionId: number, optionId: number) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    return (question?.answer as number) === optionId;
  }

  changeRadio(questionId: number, optionId: number) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    if (!!question) {
      question.answer = optionId;

      this.appService
        .updateIsTriggered(this.questionnaire)
        .subscribe((data) => (this.questionnaire = data));
    }
  }

  checkedCheckbox(questionId: number, optionId: number) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    return (question?.answer as number[]).includes(optionId);
  }

  changeCheckbox(questionId: number, optionId: number) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    if (!!question) {
      let answer = question.answer as number[];
      answer = answer.includes(optionId)
        ? answer.filter((temp) => temp !== optionId)
        : [...answer, optionId];
      question.answer = answer;

      this.appService
        .updateIsTriggered(this.questionnaire)
        .subscribe((data) => (this.questionnaire = data));
    }
  }

  changeTextarea(questionId: number, event: Event) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    if (!!question) {
      question.answer = (event.target as HTMLTextAreaElement).value;

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
