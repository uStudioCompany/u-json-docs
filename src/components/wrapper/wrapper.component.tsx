import React, { FC } from 'react';

import Flex from 'ustudio-ui/components/Flex';

import { ObjectComponent } from '../object';
import { PrimitiveNode } from '../primitive-node';
import { ArrayComponent } from '../array';
import { Types } from '../../types';

export const Wrapper: FC<Types> = ({
  schema,
  title,
  required,
}) => {
  switch (schema.type) {
    case 'object':
      return <ObjectComponent schema={schema} title={title} required={required} />;
    case 'array':
      return <ArrayComponent schema={schema} title={title} required={required} />;
    default:
      return (
        <Flex margin={{ left: 'regular' }}>
          <PrimitiveNode schema={schema} title={title} required={required} parent="primitive" />
        </Flex>
      );
  }
};
