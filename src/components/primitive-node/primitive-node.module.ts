import type { JSONSchema7 } from 'json-schema';

export const parseSchemaType = (schema: JSONSchema7, parent?: string) => {
  if (Array.isArray(schema.type)) {
    return schema.type.map((type) => JSON.stringify(type, null, 2)).join(' | ');
  }

  if (parent === 'array' && schema.items && !Array.isArray(schema.items) && typeof schema.items !== 'boolean') {
    return `array[${schema?.items?.title || schema?.items?.type}]`;
  }

  return schema.type;
};
