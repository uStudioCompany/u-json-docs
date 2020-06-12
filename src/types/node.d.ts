import { JSONSchema7 } from 'json-schema';

export interface Node {
  schema: JSONSchema7;
  title?: string;
  required?: boolean;
  parent?: string;
}
