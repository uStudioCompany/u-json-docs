import React, { FC, useState, useEffect } from 'react';

import { ThemeProvider } from 'ustudio-ui/theme';

import $RefParser from '@apidevtools/json-schema-ref-parser';

import { JSONSchema7 } from 'json-schema';

import { Wrapper } from '../wrapper';
import { JsonDocs } from './json-docs.type';
import { ErrorBoundary } from '../error-boundary';

export const JsonSchemaParser: FC<JsonDocs> = ({ schema, title }) => {
  const [unrefereedSchema, setUnrefereedSchema] = useState({} as JSONSchema7);

  useEffect(() => {
    (async () => {
      // refparser don't work with 7 draft of json-scheme
      // @ts-ignore
      const parsedSchema = await $RefParser.dereference(schema as JSONSchema7);
      setUnrefereedSchema(parsedSchema as JSONSchema7);
    })();
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Wrapper schema={unrefereedSchema} title={title} />
      </ErrorBoundary>
    </ThemeProvider>
  );
};
