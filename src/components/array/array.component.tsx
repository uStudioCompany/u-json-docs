import React, { FC } from 'react';
import Dropdown from 'ustudio-ui/components/Dropdown';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import { JSONSchema7 } from 'json-schema';

import { Wrapper } from '../wrapper';
import { PrimitiveNode } from '../primitive-node';
import { Property } from '../property';
import { Types } from '../../types';

export const ArrayComponent: FC<Types> = ({
  schema,
  title,
  required,
}) => {
  const items = schema.items as JSONSchema7;

  const DropdownContent = () => {
    if (items?.type === 'object' && items.properties) {
      return (
        <>
          {Object.entries(items.properties).map(([key, value]) => (
            <Wrapper
              key={key}
              required={Array.isArray(items.required) && items.required?.includes(key)}
              schema={value as JSONSchema7}
              title={key}
            />
          ))}
        </>
      );
    }

    if (Array.isArray(items?.type)) {
      return <Text>{items.type.map((item) => JSON.stringify(item, null, 2)).join(' | ')}</Text>;
    }

    return <Text>{JSON.stringify(items?.type, null, 2)}</Text>;
  };

  return (
    <Dropdown title={<PrimitiveNode parent="array" schema={schema} required={required} title={title} />}>
      <>
        <Flex direction="column" margin={{ left: 'regular', bottom: 'regular' }}>
          {items.title && <Text variant="h5">{items?.title}</Text>}

          {items.description && <Text color="var(--c-dark)">{items?.description}</Text>}

          {schema.maxItems && <Property title="maxItems" value={schema.maxItems} />}

          {schema.minItems && <Property title="minItems" value={schema.minItems} />}

          {schema.uniqueItems && <Property title="uniqueItems" value="Yes" />}
        </Flex>

        <DropdownContent />
      </>
    </Dropdown>
  );
};
