/* tslint:disable */
/* eslint-disable */
export interface ErrorDetails {
  code?: 'INVALID_USERNAME' | 'INVALID_PASSWORD' | 'INVALID_MAIL' | 'INVALID_TIPOLOGIA' | 'INVALID_CF' | 'INVALID_NOME' | 'INVALID_COGNOME' | 'INVALID_DATA_NASCITA' | 'GENERIC_ERROR';
  errorMessage?: string;
  fieldName?: string;
}
