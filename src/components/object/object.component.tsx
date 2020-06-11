import React, { FC } from 'react';
import Dropdown from 'ustudio-ui/components/Dropdown';
import Flex from 'ustudio-ui/components/Flex';
import { JSONSchema7 } from 'json-schema';

import { Wrapper } from '../wrapper';
import { PrimitiveNode } from '../primitive-node';
import { Property } from '../property';
import { Types } from '../../types';

export const ObjectComponent: FC<Types> = ({
  schema,
  title,
  required,
}) => (
  <Dropdown title={<PrimitiveNode schema={schema} title={title} required={required} />}>
    <>
      <Flex margin={{ bottom: 'regular' }}>
        {schema.maxProperties && <Property title="maxProperties" value={schema.maxProperties} />}

        {schema.minProperties && <Property title="minProperties" value={schema.minProperties} />}
      </Flex>

      {schema.properties &&
        Object.entries(schema.properties).map((prop) => (
          <Wrapper
            required={Array.isArray(schema?.required) && schema.required?.includes(prop[0])}
            key={prop[0]}
            schema={prop[1] as JSONSchema7}
            title={prop[0]}
          />
        ))}

      {schema.patternProperties &&
        Object.entries(schema.patternProperties).map((prop) => (
          <Wrapper
            required={Array.isArray(schema?.required) && schema.required?.includes(prop[0])}
            key={prop[0]}
            schema={prop[1] as JSONSchema7}
            title={prop[0]}
          />
        ))}
    </>
  </Dropdown>
);
