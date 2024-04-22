/* tslint:disable */
/* eslint-disable */
import { ErrorDetails } from './error-details';
export interface RestApiResponseObject {
  code?: number;
  data?: {
};
  errors?: Array<ErrorDetails>;
  message?: string;
  type?: 'ERROR' | 'WARNING' | 'INFO' | 'SUCCESS';
}
