import React from 'react';

import { JSONSchema7 } from 'json-schema';
import { Dropdown, Text, Flex } from 'ustudio-ui';

export const Wrapper = ({ schema, title, required }: { schema: JSONSchema7; title?: string; required?: boolean }) => {
  const PrimitiveNode = () => (
    <Flex padding={{ top: 'medium', bottom: 'medium' }} alignment={{ vertical: 'center' }}>
      <Text appearance="bold">{title}</Text>
      <Text variant="body" color="var(--c-negative)">
        {required ? '*' : ''}
      </Text>
      <Flex padding={{ left: 'medium', right: 'medium' }} isInline>
        <Text variant="small" color="var(--c-primary)">
          {Array.isArray(schema.type) ? schema.type.join(' | ') : schema.type}
        </Text>
      </Flex>
      <Text variant="small">
        {schema.title}. {schema.description}
      </Text>
    </Flex>
  );

  if (schema.type === 'object') {
    return (
      <Dropdown title={<PrimitiveNode />}>
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
  }

  if (schema.type === 'array') {
    return (
      <Dropdown title={<PrimitiveNode />}>
        <div>
          {
            //@ts-ignore
            schema?.items?.type === 'object' ? (
              //@ts-ignore
              Object.entries(schema?.items?.properties).map((prop) => (
                <Wrapper
                  key={prop[0]}
                  //@ts-ignore
                  required={Array.isArray(schema?.items.required) && schema.items.required?.includes(prop[0])}
                  schema={prop[1] as JSONSchema7}
                  title={prop[0]}
                />
              ))
            ) : Array.isArray(schema?.items?.type) ? (
              <Text> {schema?.items?.type.join(' | ')}</Text>
            ) : (
              <div>{JSON.stringify(schema?.items?.type)}</div>
            )
          }
        </div>
      </Dropdown>
    );
  }

  return <PrimitiveNode />;
};
