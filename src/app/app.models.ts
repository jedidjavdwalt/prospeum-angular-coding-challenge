export interface Option {
  id: number;
  verbose_name: string;
  value: string;
}

export interface Question {
  id: number;
  sort_id: number;
  title: string;
  type: 'single_choice' | 'multiple_choice' | 'multi_line_text';

  options?: Option[];
  // TODO: What's this property for?
  // condition: [
  //   {
  //     question: 1;
  //     value: 3;
  //   }
  // ];
  is_triggered: boolean;
  answer: number | number[] | string;
}
