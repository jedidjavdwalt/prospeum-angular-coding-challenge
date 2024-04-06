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

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService
      .getQuestionnaire()
      .subscribe((data) => (this.questionnaire = data));
  }
}
