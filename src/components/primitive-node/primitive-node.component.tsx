import { Flex, Text } from 'ustudio-ui';
import React, { FC } from 'react';
import { JSONSchema7 } from 'json-schema';

import Styled from './primitive-node.styles';

export const PrimitiveNode: FC<{ schema: JSONSchema7; title?: string; required?: boolean }> = ({
  schema,
  title,
  required,
}) => (
  <Flex padding={{ top: 'medium', bottom: 'medium' }} alignment={{ horizontal: 'space-between' }}>
    <Flex>
      <Styled.KeyName>
        <Text appearance="bold">{title}</Text>
        <Text variant="body" color="var(--c-negative)">
          {required ? '*' : ''}
        </Text>
      </Styled.KeyName>
      <Flex direction="column">
        <Styled.SchemaTitle variant="small">{schema.title}</Styled.SchemaTitle>
        <Text variant="small"> {schema.description}</Text>
      </Flex>
    </Flex>
    <Styled.Type padding={{ left: 'medium', right: 'medium' }} isInline>
      <Text variant="small" color="var(--c-primary)">
        {Array.isArray(schema.type) ? schema.type.join(' | ') : schema.type}
      </Text>
    </Styled.Type>
  </Flex>
);
