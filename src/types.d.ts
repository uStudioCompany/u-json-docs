import { JSONSchema7 } from 'json-schema';

export interface Types {
  schema: JSONSchema7;
  title?: string;
  required?: boolean;
  parent?: string;
}
