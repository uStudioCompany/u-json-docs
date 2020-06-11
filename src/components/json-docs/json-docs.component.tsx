import React, { FC, useState, useEffect } from 'react';

import { ThemeProvider } from 'ustudio-ui/theme';

import $RefParser from '@apidevtools/json-schema-ref-parser';

import type { JSONSchema7 } from 'json-schema';

import { Wrapper } from '../wrapper';
import { JsonDocs } from './json-docs.types';
import { ErrorBoundary } from '../error-boundary';
import { ErrorComponent } from '../error';

export const JsonSchemaParser: FC<JsonDocs> = ({ schema, title }) => {
  const [unreferredSchema, setUnreferredSchema] = useState({} as JSONSchema7);
  const [parsingError, setParsingError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setParsingError(false);
        // refparser don't work with 7 draft of json-scheme
        // @ts-ignore
        const parsedSchema = await $RefParser.dereference(schema);
        setUnreferredSchema(parsedSchema as JSONSchema7);
      } catch (e) {
        setParsingError(true);
      }
    })();
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        {parsingError ? <ErrorComponent /> : <Wrapper schema={unreferredSchema} title={title} />}
      </ErrorBoundary>
    </ThemeProvider>
  );
};
