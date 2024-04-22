/* tslint:disable */
/* eslint-disable */
import { ErrorDetails } from './error-details';
export interface RestApiResponse {
  code?: number;
  data?: {
};
  errors?: Array<ErrorDetails>;
  message?: string;
  type?: 'ERROR' | 'WARNING' | 'INFO' | 'SUCCESS';
}
