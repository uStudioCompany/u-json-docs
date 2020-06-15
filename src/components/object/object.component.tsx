import React, { FC } from 'react';

import Dropdown from 'ustudio-ui/components/Dropdown';
import Flex from 'ustudio-ui/components/Flex';

import type { JSONSchema7 } from 'json-schema';

import { Wrapper } from '../wrapper';
import { PrimitiveNode } from '../primitive-node';
import { Property } from '../property';

import type { Node } from '../../types';

export const ObjectComponent: FC<Node> = ({ schema, title, required }) => {
  const objectProperties: (keyof JSONSchema7)[] = ['maxProperties', 'minProperties'];

  return (
    <Dropdown title={<PrimitiveNode schema={schema} title={title} required={required} />}>
      <>
        <Flex margin={{ bottom: 'regular' }}>
          {objectProperties.map((item) => {
            const property = schema?.[item];
            return property && <Property key={item} title={item} value={JSON.stringify(property, null, 2)} />;
          })}
        </Flex>

        {schema.properties &&
          Object.entries(schema.properties).map(([key, value]) => (
            <Wrapper required={schema?.required?.includes(key)} key={key} schema={value as JSONSchema7} title={key} />
          ))}

        {schema.patternProperties &&
          Object.entries(schema.patternProperties).map(([key, value]) => (
            <Wrapper required={schema?.required?.includes(key)} key={key} schema={value as JSONSchema7} title={key} />
          ))}
      </>
    </Dropdown>
  );
};
