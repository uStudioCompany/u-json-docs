import React from 'react';

import { ThemeProvider } from 'ustudio-ui/theme';

import { JsonSchemeParser } from './../components';

import { JSONSchema7 } from 'json-schema';

const App = () => {
  const schema: JSONSchema7 = {
    id: '',
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    required: ['title', 'description', 'classification', 'lots'],
    properties: {
      title: {
        type: 'string',
      },
      description: {
        type: 'string'
      },
      classifications: {
        type: 'object',
        $comment: 'it is comment line',
        maxLength: 10,
        properties: {
          scheme: {
            type: 'string'
          },
          id: {
            type: 'string'
          },
          description: {
            type: 'string'
          }
        }
      },
      lots: {
        type: "array",
        minItems: 1,

      },
      items: {
        type: 'array',
        minItems: 1,
        maxItems:100,
        items: {
          required: ['id', 'description', 'relatedLot' ],
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            relatedLot: {
              type: 'string'
            },
            classification: {
              type: 'object',
              properties: {
                scheme: {
                  type: 'string'
                },
                id: {
                  type: 'string'
                },
                description: {
                  type: 'string'
                }
              }
            },
            additionalClassification: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  scheme: {
                    type: 'string'
                  },
                  id: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  }
                }
              }
            },
            quantity: {
              type: 'number'
            },
            unit: {
              type: 'object',
              properties: {
                id: {
                  type: 'number'
                },
                name: {
                  type: 'string'
                }
              }
            }
          }
        }
      }

    },
  };

  return (
    <ThemeProvider>
      <JsonSchemeParser schema={schema} title="Category version" />
    </ThemeProvider>
  );
};

export default App;
