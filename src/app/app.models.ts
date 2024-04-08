export interface Option {
  id: string;
  value: string;
}

export interface Question {
  id: string;
  title: string;
  type: 'single_choice' | 'multiple_choice' | 'multi_line_text';
  is_triggered: boolean;
  // answers: number | number[] | string;
  answers: string[];

  options?: Option[];
}
