import React, { FC } from 'react';
import Dropdown from 'ustudio-ui/components/Dropdown';
import Flex from 'ustudio-ui/components/Flex';
import { JSONSchema7 } from 'json-schema';

import { Wrapper } from '../wrapper';
import { PrimitiveNode } from '../primitive-node';
import { Property } from '../property';
import { Types } from '../../types';

export const ObjectComponent: FC<Types> = ({schema, title, required}) => {
  const arrayOfProperty = ['maxProperties', 'minProperties'];
  return (
    <Dropdown title={<PrimitiveNode schema={schema} title={title} required={required} />}>
      <>
        <Flex margin={{ bottom: 'regular' }}>
          {arrayOfProperty.map((item) => {
            // @ts-ignore
            const property = schema?.[item];
            return property && <Property title={item} value={property} />;
          })}
        </Flex>

        {schema.properties &&
          Object.entries(schema.properties).map(([key, value]) => (
            <Wrapper
              required={Array.isArray(schema?.required) && schema.required?.includes(key)}
              key={key}
              schema={value as JSONSchema7}
              title={key}
            />
          ))}

        {schema.patternProperties &&
          Object.entries(schema.patternProperties).map(([key, value]) => (
            <Wrapper
              required={Array.isArray(schema?.required) && schema.required?.includes(key)}
              key={key}
              schema={value as JSONSchema7}
              title={key}
            />
          ))}
      </>
    </Dropdown>
  );
}
