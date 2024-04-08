import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { Question } from './app.models';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AppService],
})
export class AppComponent implements OnInit {
  questionnaire: Question[] = [];

  checkedRadio(questionId: string, optionId: string) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    return question?.answers[0] === optionId;
  }

  async changeRadio(questionId: string, optionId: string) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    if (!!question) {
      question.answers = [optionId];

      this.questionnaire = await this.appService.updateIsTriggered(
        this.questionnaire
      );
    }
  }

  checkedCheckbox(questionId: string, optionId: string) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    return question?.answers.includes(optionId);
  }

  async changeCheckbox(questionId: string, optionId: string) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    if (!!question) {
      let answer = question.answers;
      answer = answer.includes(optionId)
        ? answer.filter((temp) => temp !== optionId)
        : [...answer, optionId];
      question.answers = answer;

      this.questionnaire = await this.appService.updateIsTriggered(
        this.questionnaire
      );
    }
  }

  async changeTextarea(questionId: string, event: Event) {
    const question = this.questionnaire.find((temp) => temp.id === questionId);
    if (!!question) {
      question.answers = [(event.target as HTMLTextAreaElement).value];

      this.questionnaire = await this.appService.updateIsTriggered(
        this.questionnaire
      );
    }
  }

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService
      .getQuestionnaire()
      .pipe(take(1))
      .subscribe((data) => {
        console.log('data');
        return (this.questionnaire = data);
      });
  }
}
