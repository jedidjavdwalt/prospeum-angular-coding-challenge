import { Observable, delay, of } from 'rxjs';
import { Question } from './app.models';

export const mockData: Question[] = [
  {
    id: crypto.randomUUID(),
    title: 'Question 1',
    type: 'single_choice',
    is_triggered: true,
    answers: [],
    options: [
      {
        id: crypto.randomUUID(),
        value: 'Option 1',
      },
      {
        id: crypto.randomUUID(),
        value: 'Option 2',
      },
      {
        id: crypto.randomUUID(),
        value: 'Option 3',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Question 2',
    type: 'multiple_choice',
    is_triggered: true,
    answers: [],
    options: [
      {
        id: crypto.randomUUID(),
        value: 'Option 1',
      },
      {
        id: crypto.randomUUID(),
        value: 'Option 2',
      },
      {
        id: crypto.randomUUID(),
        value: 'Option 3',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Question 3',
    type: 'multi_line_text',
    is_triggered: false,
    answers: [],
  },
];

export class AppService {
  private questionnaire: Question[];

  constructor() {
    this.questionnaire = mockData;
  }

  getQuestionnaire(): Observable<Question[]> {
    // Simulate async request with a delay of 1 second
    return of(this.questionnaire).pipe(delay(1000));
  }

  updateIsTriggered(data: Question[]): Promise<Question[]> {
    for (const question of data) {
      question.is_triggered = question.answers.length > 0;
    }
    this.questionnaire = data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.questionnaire);
      }, 1000); // Simulate async request with a delay of 1 second
    });
  }
}
