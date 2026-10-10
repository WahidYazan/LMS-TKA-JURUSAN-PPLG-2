import { HOTSQuestion } from '../../types';
import { questions as modul1Questions } from './modul1';
import { questions as modul2Questions } from './modul2';
import { questions as modul3Questions } from './modul3';
import { questions as modul4Questions } from './modul4';
import { questions as modul5Questions } from './modul5';

export const quizQuestionsPPLG: HOTSQuestion[] = [
  ...modul1Questions,
  ...modul2Questions,
  ...modul3Questions,
  ...modul4Questions,
  ...modul5Questions
];
