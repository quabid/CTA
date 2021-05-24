// @ts-nocheck
import colors from 'colors';
import { log } from './Printer.js';

export const errorMessage = (arg = '') => log(`${arg}`.bold.brightRed);

export const successMessage = (arg = '') => log(`${arg}`.bold.brightGreen);

export const warningMessage = (arg = '') => log(`${arg}`.bold.brightYellow);

export const infoMessage = (arg = '') => log(`${arg}`.bold.grey.bgWhite);

export const fyiMessage = (arg = '') => log(`${arg}`.bold.brightWhite);
