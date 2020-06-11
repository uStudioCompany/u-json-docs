export const parseSchemaType = (schema: any, parent: any) => {
  if (Array.isArray(schema.type)) {
    return schema.type.map((type: any) => JSON.stringify(type, null, 2)).join(' | ');
  }

  if (parent === 'array' && schema.items && !Array.isArray(schema.items) && typeof schema.items !== 'boolean') {
    return `array[${schema?.items?.title || schema?.items?.type}]`;
  }

  return schema.type;
};
