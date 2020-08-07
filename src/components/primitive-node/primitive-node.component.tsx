import React, { FC } from 'react';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import { JSONSchema7 } from 'json-schema';

import Styled from './primitive-node.styles';
import { Property } from '../property';
import type { Node } from '../../types';

import { parseSchemaType } from './primitive-node.module';

export const PrimitiveNode: FC<Node> = ({ schema, title, parent, required }) => {
  const primitiveProperties: (keyof JSONSchema7)[] = [
    'const',
    'default',
    'examples',
    'multipleOf',
    'maximum',
    'exclusiveMaximum',
    'minimum',
    'exclusiveMinimum',
    'maxLength',
    'minLength',
    'pattern',
    'format',
    'readOnly',
    'writeOnly',
  ];

  return (
    <Styled.Node padding={{ top: 'medium', bottom: 'medium' }} alignment={{ horizontal: 'space-between' }}>
      <Flex>
        <Styled.KeyName>
          {title && <Text appearance="bold">{title}</Text>}

          {required && (
            <Styled.Tag>
              <Styled.TagText>required</Styled.TagText>
            </Styled.Tag>
          )}
        </Styled.KeyName>

        <Flex direction="column" alignment={{ vertical: 'center' }}>
          {schema.title && <Styled.SchemaTitle variant="small">{schema.title}</Styled.SchemaTitle>}

          {schema.description && <Text variant="small"> {schema.description}</Text>}

          {schema.enum && (
            <Property title="enum" value={schema.enum.map((el) => JSON.stringify(el, null, 2)).join(' | ')} />
          )}

          {primitiveProperties.map((item) => {
            const property = schema?.[item];
            return property && <Property title={item} value={JSON.stringify(property, null, 2)} />;
          })}
        </Flex>
      </Flex>

      {schema.type && (
        <Styled.Type isInline marginRight={parent === 'primitive' ? '58px' : 'var(--i-regular)'}>
          <Text variant="small" color="var(--c-primary)">
            {parseSchemaType(schema, parent)}
          </Text>
        </Styled.Type>
      )}
    </Styled.Node>
  );
};
