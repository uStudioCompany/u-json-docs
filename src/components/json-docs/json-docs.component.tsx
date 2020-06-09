import React, { FC, useState, useEffect } from 'react';

import { ThemeProvider } from 'ustudio-ui/theme';

import $RefParser from '@apidevtools/json-schema-ref-parser';

import { JSONSchema7 } from 'json-schema';

import { Wrapper } from '../wrapper';
import { JsonDocs } from './json-docs.type';
import { ErrorBoundaryComponent } from '../error-boundary';


const JsonSchemeParser: FC<JsonDocs> = ({ schema, title }) => {
  const [unrefereedSchema, setUnrefereedSchema] = useState({} as JSONSchema7);

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const parsedSchema = await $RefParser.dereference(schema as JSONSchema7);
      setUnrefereedSchema(parsedSchema as JSONSchema7);
    })();
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundaryComponent>
        <Wrapper schema={unrefereedSchema} title={title}/>
      </ErrorBoundaryComponent>
    </ThemeProvider>
  );
};

export default JsonSchemeParser;
