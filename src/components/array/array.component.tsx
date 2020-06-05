import React, { FC } from 'react';
import { Dropdown, Text, Flex } from 'ustudio-ui';
import { JSONSchema7 } from 'json-schema';

import { Wrapper, PrimitiveNode, Property } from './../../components';

export const ArrayComponent: FC<{ schema: JSONSchema7; title?: string; required?: boolean }> = ({
  schema,
  title,
  required,
}) => {
  const items = schema.items as JSONSchema7;

  return (
    <Dropdown title={<PrimitiveNode parent="array" schema={schema} required={required} title={title} />}>
      <div>
        <Flex direction="column" margin={{ left: 'regular', bottom: 'regular' }}>
          <Text variant="h5">{items.title}</Text>
          <Text color="var(--c-dark)">{items.description}</Text>
          {schema.maxItems && <Property title="maxItems" value={schema.maxItems} />}
          {schema.minItems && <Property title="minItems" value={schema.minItems} />}
          {schema.uniqueItems && <Property title="uniqueItems" value="Yes" />}
        </Flex>
        {items?.type === 'object' && items.properties ? (
          Object.entries(items?.properties).map((prop) => (
            <Wrapper
              key={prop[0]}
              required={Array.isArray(items.required) && items.required?.includes(prop[0])}
              schema={prop[1] as JSONSchema7}
              title={prop[0]}
            />
          ))
        ) : Array.isArray(items?.type) ? (
          <Text> {items?.type.join(' | ')}</Text>
        ) : (
          <div>{JSON.stringify(items?.type)}</div>
        )}
      </div>
    </Dropdown>
  );
};
