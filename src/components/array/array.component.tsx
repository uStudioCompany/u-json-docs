import React, { FC } from 'react';
import { Dropdown, Text } from 'ustudio-ui';
import { JSONSchema7 } from 'json-schema';

import { Wrapper, PrimitiveNode } from './../../components';

export const ArrayComponent: FC<{ schema: JSONSchema7; title?: string; required?: boolean }> = ({
  schema,
  title,
  required,
}) => (
  <Dropdown title={<PrimitiveNode schema={schema} required={required} title={title} />}>
    <div>
      {
        //@ts-ignore
        schema?.items?.type === 'object' ? (
          //@ts-ignore
          Object.entries(schema?.items?.properties).map((prop) => (
            <Wrapper
              key={prop[0]}
              //@ts-ignore
              required={Array.isArray(schema?.items.required) && schema.items.required?.includes(prop[0])}
              schema={prop[1] as JSONSchema7}
              title={prop[0]}
            />
          ))
        ) : Array.isArray(schema?.items?.type) ? (
          <Text> {schema?.items?.type.join(' | ')}</Text>
        ) : (
          <div>{JSON.stringify(schema?.items?.type)}</div>
        )
      }
    </div>
  </Dropdown>
);
