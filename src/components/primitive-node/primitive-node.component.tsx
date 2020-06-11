import React, { FC } from 'react';

import { Flex, Text } from 'ustudio-ui';
import { JSONSchema7 } from 'json-schema';

import Styled from './primitive-node.styles';
import { Property } from '../property';

export const PrimitiveNode: FC<{ schema: JSONSchema7; title?: string; required?: boolean; parent?: string }> = ({
  schema,
  title,
  parent,
  required,
}) => {
  const getType = () => {
    if (Array.isArray(schema.type)) {
      return schema.type.map((type) => JSON.stringify(type, null, 2)).join(' | ');
    }

    if (parent === 'array' && schema.items && !Array.isArray(schema.items) && typeof schema.items !== 'boolean') {
      return `array[${schema?.items?.title || schema?.items?.type}]`;
    }

    return schema.type;
  };

  const array: (keyof JSONSchema7)[] = ['const', 'default', 'examples', 'multipleOf', 'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum', 'maxLength', 'minLength', 'pattern', 'format', 'readOnly', 'writeOnly' ];

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

        <Flex direction="column">
          {schema.title && <Styled.SchemaTitle variant="small">{schema.title}</Styled.SchemaTitle>}

          {schema.description && <Text variant="small"> {schema.description}</Text>}

          {schema.enum && (
            <Property title="enum" value={schema.enum.map((el) => JSON.stringify(el, null, 2)).join(' | ')} />
          )}

          {array.map((item) => {
            const property = schema?.[item];
            return property && <Property title={item} value={JSON.stringify(property, null, 2)} />;
          })}

        </Flex>
      </Flex>

      {schema.type && (
        <Styled.Type isInline marginRight={parent === 'primitive' ? '58px' : 'var(--i-regular)'}>
          <Text variant="small" color="var(--c-primary)">
            {getType()}
          </Text>
        </Styled.Type>
      )}
    </Styled.Node>
  );
};
