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
      return schema.type.join(' | ');
    }

    if (parent === 'array' && schema.items && !Array.isArray(schema.items) && typeof schema.items !== 'boolean') {
      return `array[${schema?.items?.title || schema?.items?.type}]`;
    }

    return schema.type;
  };
  return (
    <Styled.Node padding={{ top: 'medium', bottom: 'medium' }} alignment={{ horizontal: 'space-between' }}>
      <Flex>
        <Styled.KeyName>
          <Text appearance="bold">{title}</Text>
          {required && (
            <Styled.Tag>
              <Styled.TagText>required</Styled.TagText>
            </Styled.Tag>
          )}
        </Styled.KeyName>
        <Flex direction="column">
          <Styled.SchemaTitle variant="small">{schema.title}</Styled.SchemaTitle>

          <Text variant="small"> {schema.description}</Text>
          {schema.enum && (
            <Property title="enum" value={schema.enum.map((el) => JSON.stringify(el, null, 2)).join(' | ')} />
          )}

          {schema.const && <Property title="const" value={JSON.stringify(schema.const, null, 2)} />}

          {schema.default && <Property title="default" value={JSON.stringify(schema.default, null, 2)} />}

          {schema.examples && <Property title="examples" value={JSON.stringify(schema.examples, null, 2)} />}

          {schema.multipleOf && <Property title="multiple of" value={schema.multipleOf} />}

          {schema.maximum && <Property title="maximum" value={schema.maximum} />}

          {schema.exclusiveMaximum && <Property title="exclusive maximum" value={schema.exclusiveMaximum} />}

          {schema.minimum && <Property title="minimum" value={schema.minimum} />}

          {schema.exclusiveMinimum && <Property title="exclusive minimum" value={schema.exclusiveMinimum} />}

          {schema.maxLength && <Property title="max length" value={schema.maxLength} />}

          {schema.minLength && <Property title="min length" value={schema.minLength} />}

          {schema.pattern && <Property title="pattern" value={schema.pattern} />}

          {schema.format && <Property title="format" value={schema.format} />}

          {schema.readOnly && <Property title="readOnly" value="Yes" />}

          {schema.writeOnly && <Property title="writeOnly" value="Yes" />}
        </Flex>
      </Flex>
      <Styled.Type isInline marginRight={parent === 'primitive' ? '58px' : 'var(--i-regular)'}>
        <Text variant="small" color="var(--c-primary)">
          {getType()}
        </Text>
      </Styled.Type>
    </Styled.Node>
  );
};
