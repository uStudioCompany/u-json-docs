import React, { FC } from 'react';
import { Dropdown } from 'ustudio-ui';
import { JSONSchema7 } from 'json-schema';

import { Wrapper, PrimitiveNode } from './../../components';

export const ObjectComponent: FC<{ schema: JSONSchema7; title?: string; required?: boolean }> = ({
  schema,
  title,
  required,
}) => (
  <Dropdown title={<PrimitiveNode schema={schema} title={title} required={required} />}>
    <div>
      {
        //@ts-ignore
        Object.entries(schema?.properties).map((prop) => (
          <Wrapper
            required={Array.isArray(schema?.required) && schema.required?.includes(prop[0])}
            key={prop[0]}
            schema={prop[1]}
            title={prop[0]}
          />
        ))
      }
    </div>
  </Dropdown>
);
