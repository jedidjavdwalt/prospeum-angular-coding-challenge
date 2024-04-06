import { Observable, delay, of } from 'rxjs';
import { Question } from './app.models';

export const mockData: Question[] = [
  {
    id: 1,
    sort_id: 1,
    title: 'Question 1',
    type: 'single_choice',
    options: [
      {
        id: 1,
        verbose_name: 'Option 1',
        value: 'value 1',
      },
      {
        id: 2,
        verbose_name: 'Option 2',
        value: 'value 2',
      },
      {
        id: 3,
        verbose_name: 'Option 3',
        value: 'value 3',
      },
    ],
    // TODO: What's this property for?
    // condition: null,
    is_triggered: true,
    answer: 1,
  },
  {
    id: 2,
    sort_id: 2,
    title: 'Question 2',
    type: 'multiple_choice',

    options: [
      {
        id: 1,
        verbose_name: 'Option 1',
        value: 'value 1',
      },
      {
        id: 2,
        verbose_name: 'Option 2',
        value: 'value 2',
      },
      {
        id: 3,
        verbose_name: 'Option 3',
        value: 'value 3',
      },
    ],
    // TODO: What's this property for?
    // condition: [
    //   {
    //     question: 1,
    //     value: 3,
    //   },
    // ],
    is_triggered: true,
    answer: [2],
  },
  {
    id: 3,
    sort_id: 3,
    title: 'Question 3',
    type: 'multi_line_text',
    // TODO: What's this property for?
    // condition: [
    //   {
    //     question: 1,
    //     value: 3,
    //   },
    //   {
    //     question: 2,
    //     value: [2, 3],
    //   },
    // ],
    is_triggered: false,
    answer: '',
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

  updateIsTriggered(data: Question[]): Observable<Question[]> {
    for (const question of data) {
      switch (question.type) {
        case 'single_choice':
        case 'multi_line_text': {
          question.is_triggered = !!question.answer;
          break;
        }

        case 'multiple_choice': {
          question.is_triggered = (question.answer as number[]).length > 0;
          break;
        }

        default: {
          break;
        }
      }
    }
    this.questionnaire = data;

    // Simulate async request with a delay of 1 second
    return of(this.questionnaire).pipe(delay(1000));
  }
}
