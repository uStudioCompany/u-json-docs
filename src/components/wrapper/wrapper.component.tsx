import React, { FC } from 'react';

import { JSONSchema7 } from 'json-schema';

import Flex from 'ustudio-ui/components/Flex';

import { PrimitiveNode, ObjectComponent, ArrayComponent } from './../../components';

export const Wrapper: FC<{ schema: JSONSchema7; title?: string; required?: boolean }> = ({
  schema,
  title,
  required,
}) => {
  if (schema.type === 'object') {
    return <ObjectComponent schema={schema} required={required} title={title} />;
  }

  if (schema.type === 'array') {
    return <ArrayComponent schema={schema} title={title} required={required} />;
  }

  return (
    <Flex margin={{ left: 'regular' }}>
      <PrimitiveNode schema={schema} title={title} required={required} />
    </Flex>
  );
};
