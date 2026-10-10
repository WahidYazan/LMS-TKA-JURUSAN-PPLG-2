import { CheatSheetSection } from '../../types';
import { gitCheatSheet } from './git';
import { httpCheatSheet } from './http';
import { sqlCheatSheet } from './sql';
import { oopCheatSheet } from './oop';

export type { CheatSheetSection };

export const cheatsheetData: CheatSheetSection[] = [
  gitCheatSheet,
  httpCheatSheet,
  sqlCheatSheet,
  oopCheatSheet
];
