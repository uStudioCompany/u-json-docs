import React from 'react';

import { ThemeProvider } from 'ustudio-ui/theme';
import { Wrapper } from './components/json-scheme-wrapper.component';

import $RefParser from '@apidevtools/json-schema-ref-parser';
import { JSONSchema7 } from 'json-schema';

const App = () => {
  const [unrefereedSchema, setUnrefereedSchema] = React.useState({} as JSONSchema7);

  const schema = {
    id: '',
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'Schema for a Category Version',
    description:
      'Each version provides data about an actual version of the category at a particular point in time. Version can be used to notify users about any changes or updates. One category may have many versions.',
    type: 'object',
    required: ['id', 'date', 'status', 'category'],
    properties: {
      id: {
        title: 'Version ID',
        description: 'An identifier for this particular version of information',
        type: 'string',
      },
      date: {
        title: 'Release Date',
        description: 'The date this version was released, or published.',
        type: 'string',
        format: 'date-time',
      },
      status: {
        title: 'Category status',
        enum: ['active', 'pending'],
        type: 'string',
      },
      category: {
        title: 'Category',
        description: 'A specific category of goods presented by its particular version',
        $ref: '#/definitions/Category',
      },
    },
    definitions: {
      Category: {
        title: 'Category',
        description: 'A specific category of goods presented by its particular version',
        type: 'object',
        properties: {
          id: {
            title: 'Category ID',
            description:
              'ID for this category specified as a code of a relevant CPV class common for all the items under this category',
            type: 'string',
          },
          title: {
            title: 'Category title',
            description: 'General title for this category',
            type: 'string',
          },
          description: {
            title: 'Category description',
            description: 'General description for this category',
            type: 'string',
          },
          classification: {
            title: 'Classification',
            description: 'Common classification for this category taken from CPV. Structure according to ',
            type: 'object',
            $ref: '#/definitions/Classification',
          },
          items: {
            title: 'Category items',
            description: 'List of the types of goods available under this category',
            type: 'array',
            items: {
              $ref: '#/definitions/Item',
            },
          },
          documents: {
            title: 'Documents',
            description: 'A list of documents related to the planning process.',
            type: 'array',
            items: {
              $ref: '#/definitions/Document',
            },
          },
          criteria: {
            title: 'Decision making tree',
            description:
              'Criteria describe the sequence of related questions, where answers are needed to reflect the specific needs that the Procuring Entity intends to purchase. Array according to [ocds_requirements_extension](https://github.com/open-contracting-extensions/ocds_requirements_extension)',
            type: 'array',
            items: {
              $ref: '#/definitions/Criterion',
            },
          },
          conversions: {
            title: 'Conversions',
            description:
              "Conversions needed to run a calculation of available valiants once Procuring Entities' need is captured. Array according to [eOCDS-conversions](https://github.com/eOCDS-Extensions/eOCDS-conversions) ",
            type: 'array',
            items: {
              $ref: '#/definitions/Conversion',
            },
          },
        },
      },
      Classification: {
        title: 'Classification',
        type: 'object',
        properties: {
          scheme: {
            title: 'Scheme',
            description:
              'Classification should be drawn from an existing scheme or list of codes. This field is used to indicate the scheme/codelist from which the classification is drawn.',
            type: ['string', 'null'],
            codelist: 'https://simap.ted.europa.eu/web/simap/cpv',
          },
          id: {
            title: 'ID',
            description: 'The classification code drawn from the selected scheme.',
            type: ['string', 'integer', 'null'],
          },
          description: {
            title: 'Description',
            description: 'A textual description or title for the code.',
            type: ['string', 'null'],
          },
          uri: {
            title: 'URI',
            description:
              'A URI to identify the code. In the event individual URIs are not available for items in the identifier scheme this value should be left blank.',
            type: ['string', 'null'],
            format: 'uri',
          },
        },
      },
      Coefficient: {
        title: 'Coefficient',
        description: 'A coefficient applied in case of the value of prescribed attribute matches',
        type: 'object',
        properties: {
          id: {
            title: 'Identifier',
            description: 'An identifier for this coefficient.',
            type: ['integer', 'string'],
          },
          value: {
            title: 'Requirement value',
            description: "Value of related 'requirement' received through 'requirementResponse'",
            type: ['integer', 'number', 'null'],
          },
          minValue: {
            title: 'Indicative minimum requirement value',
            description: "Indicative minimum value of related 'requirement' received through 'requirementResponse'",
            type: ['integer', 'number', 'null'],
          },
          maxValue: {
            title: 'Indicative maximum value',
            description: "Indicative maximum value of related 'requirement' received through 'requirementResponse'",
            type: ['integer', 'number', 'null'],
          },
          period: {
            title: 'Period',
            description: 'Used to specify a particular period the conversion and its coefficients are applies to',
            $ref: '#/definitions/Period',
          },
          coefficient: {
            title: 'Coefficient',
            description: 'Precise value that has to be applied for conversion in specific case',
            type: ['integer', 'number', 'null'],
          },
        },
      },
      Conversion: {
        title: 'Conversion',
        description:
          'Conversion is used to describe conversions and its coefficients applicable for specific value received for requirement or observation',
        type: 'object',
        properties: {
          id: {
            title: 'Identifier',
            description: 'An identifier for this conversion.',
            type: ['integer', 'string'],
          },
          relatesTo: {
            title: 'Related schema element',
            description:
              'The schema element that the conversion applies. For example, the conversion may be defined against a requirement or against a metric.',
            type: 'string',
            openCodelist: false,
            enum: ['requirement'],
          },
          relatedItem: {
            title: 'Related item',
            description:
              "Where 'relatesTo' is not empty this field must be populated with the id of the item in this tender section which the conversion relates to.",
            type: 'string',
          },
          rationale: {
            title: 'Conversion rationale',
            description: 'The free-text rationale of using of this conversion',
            type: 'string',
          },
          description: {
            title: 'Conversion Details',
            description: 'Free text description of this conversion could be shared here',
            type: 'string',
          },
          coefficients: {
            title: 'Coefficients',
            description: 'A list of any applicable coefficient for this conversion',
            type: 'array',
            items: {
              $ref: '#/definitions/Coefficient',
            },
          },
        },
      },
      Criterion: {
        type: 'object',
        title: 'Criterion',
        description: 'A criterion on which either bidders or items will be judged, evaluated or assessed.',
        properties: {
          id: {
            description: 'The identifier for this criterion',
            type: ['string', 'integer'],
          },
          title: {
            description: 'Criterion title',
            type: ['string', 'null'],
          },
          description: {
            description: 'Criterion description',
            type: ['string', 'null'],
          },
          relatesTo: {
            description:
              'The schema element that the criterion judges, evaluates or assesses. For example criterion may be defined against items or against bidders.',
            type: 'string',
            enum: ['item'],
          },
          relatedItem: {
            description:
              'Where relatesTo = "item" this field must be populated with the id of the item in this tender section which the criterion relates to. Where relatesTo <> "item" this field should be omitted',
            type: ['string', 'null'],
          },
          requirementGroups: {
            title: 'Requirement groups',
            description:
              'A list of requirementGroup for this Criterion. A criterion is satisfied by one or more requirement groups being met. A requirement group is met when all requirements in the group are satisfied.',
            type: 'array',
            items: {
              $ref: '#/definitions/RequirementGroup',
            },
          },
        },
      },
      Item: {
        title: 'Item',
        description: 'Specific type of good available under this category',
        type: 'object',
        properties: {
          id: {
            title: 'ID',
            description:
              'A local identifier to reference and merge the items by. Must be unique within a given array of items.',
            type: ['string', 'integer'],
          },
          description: {
            title: 'Description',
            description: 'A description of this specific type of good',
            type: ['string', 'null'],
          },
          classification: {
            title: 'Classification',
            description: 'The primary classification for the item',
            $ref: '#/definitions/Classification',
          },
          additionalClassifications: {
            title: 'Additional classifications',
            description:
              'An array of additional classification for the item. This may also be used to present codes from an internal classification scheme.',
            type: 'array',
            items: {
              $ref: '#/definitions/Classification',
            },
          },
        },
      },
      Document: {
        type: 'object',
        title: 'Document',
        description:
          'Links to, or descriptions of, external documents can be attached at various locations within the standard. Documents can be supporting information, formal notices, downloadable forms, or any other kind of resource that ought to be made public as part of full open contracting.',
        required: ['id'],
        properties: {
          id: {
            title: 'ID',
            description:
              'A local, unique identifier for this document. This field is used to keep track of multiple revisions of a document through the compilation from release to record mechanism.',
            type: ['string', 'integer'],
            minLength: 1,
          },
          documentType: {
            title: 'Document type',
            description:
              'A classification of the document described, using the open [documentType](https://standard.open-contracting.org/{{version}}/{{lang}}/schema/codelists/#document-type) codelist.',
            type: ['string', 'null'],
            codelist: 'documentType.csv',
            openCodelist: true,
          },
          title: {
            title: 'Title',
            description: 'The document title.',
            type: ['string', 'null'],
          },
          description: {
            title: 'Description',
            description:
              'A short description of the document. Descriptions are recommended to not exceed 250 words. In the event the document is not accessible online, the description field can be used to describe arrangements for obtaining a copy of the document.',
            type: ['string', 'null'],
          },
          relatesTo: {
            title: 'Related schema element',
            description: 'The schema element that the document judges, evaluates or assesses.',
            type: ['string', 'null'],
            enum: ['item', null],
          },
          relatedItem: {
            title: 'Related item',
            description:
              'Where relatesTo = "item" this field must be populated with the id of the item in this tender section which the criterion relates to. Where relatesTo <> "item" this field should be omitted.',
            type: ['string', 'null'],
            minLength: 1,
          },
          url: {
            title: 'URL',
            description:
              'A direct link to the document or attachment. The server providing access to this document ought to be configured to correctly report the document mime type.',
            type: ['string', 'null'],
            format: 'uri',
          },
          datePublished: {
            title: 'Date published',
            description:
              'The date on which the document was first published. This is particularly important for legally important documents such as notices of a tender.',
            type: ['string', 'null'],
            format: 'date-time',
          },
          dateModified: {
            title: 'Date modified',
            description: 'Date that the document was last modified',
            type: ['string', 'null'],
            format: 'date-time',
          },
          format: {
            title: 'Format',
            description:
              "The format of the document, using the open [IANA Media Types](http://www.iana.org/assignments/media-types/) codelist (see the values in the 'Template' column), or using the 'offline/print' code if the described document is published offline. For example, web pages have a format of 'text/html'.",
            type: ['string', 'null'],
          },
          language: {
            title: 'Language',
            description:
              'The language of the linked document using either two-letter [ISO639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), or extended [BCP47 language tags](http://www.w3.org/International/articles/language-tags/). The use of lowercase two-letter codes from [ISO639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) is recommended unless there is a clear user need for distinguishing the language subtype.',
            type: ['string', 'null'],
          },
        },
      },
      OptionDetails: {
        title: 'Option Details',
        description: "Where options are applied 'Option Details' is used to capture this information",
        type: 'object',
        properties: {
          optionGroups: {
            title: 'Option groups',
            description: 'A list of option groups for this element',
            type: 'array',
            items: {
              $ref: '#/definitions/OptionGroup',
            },
          },
          optionsToCombine: {
            title: 'Options to combine',
            description:
              "Where buyer reserves the right to combine options a 'Option to combine' is used to capture this information",
            type: 'array',
            items: {
              $ref: '#/definitions/OptionToCombine',
            },
          },
        },
      },
      OptionGroup: {
        title: 'Option Group',
        description:
          'An option group is a set of options that may be applied by Procuring Entity for specific property',
        type: 'object',
        properties: {
          id: {
            title: 'Identifier',
            description: 'An identifier for this group',
            type: ['string', 'integer'],
          },
          description: {
            title: 'Description',
            description: 'Free-text description for this group',
            type: 'string',
          },
          relatesTo: {
            title: 'Related scheme element',
            description: 'The scheme element that the group applies',
            type: 'string',
            openCodelist: 'true',
            enum: ['value'],
          },
          options: {
            title: 'Options',
            description: "Options available for this 'optionGroup'",
            type: 'array',
            items: {
              $ref: '#/definitions/Option',
            },
          },
        },
      },
      OptionToCombine: {
        title: 'Option to combine',
        description:
          "Where buyer reserves the right to combine options a 'Option to combine' is used to capture this information",
        type: 'object',
        properties: {
          id: {
            title: 'Identifier',
            description: 'An identifier for this OptionToCombine',
            type: ['string', 'integer'],
          },
          relatedOptions: {
            title: 'Related options',
            description: 'A number of options related to this OptionToCombine',
            type: 'array',
            items: {
              type: ['string', 'integer'],
            },
          },
        },
      },
      Option: {
        title: 'Option',
        description: 'A substance of any options',
        type: 'object',
        properties: {
          id: {
            title: 'Identifier',
            description: '',
            type: ['string', 'integer'],
          },
          description: {
            title: 'Description',
            description: 'Free-text description for this option',
            type: 'string',
          },
          value: {
            title: 'Value',
            description: 'Value provided by this option',
            type: ['string', 'integer', 'number'],
          },
        },
      },
      Period: {
        title: 'Period',
        type: 'object',
        properties: {
          startDate: {
            title: 'Start date',
            description: 'The start date for the period',
            type: 'string',
            format: 'date-time',
          },
          endDate: {
            title: 'End date',
            description: 'The end date for the period',
            type: 'string',
            format: 'date-time',
          },
          maxExtentDate: {
            title: 'Maximum extent',
            description: 'The period cannot be extended beyond this date.',
            format: 'date-time',
            type: 'string',
          },
          durationInDays: {
            title: 'Duration (days)',
            description:
              'The maximum duration of this period in days. Where a start and end date are given, this field is optional, and should reflect the difference between those two days.',
            type: ['integer', 'null'],
          },
          duration: {
            title: 'Duration',
            description: 'The duration of the period reflected in ISO format',
            type: 'string',
            format: 'ISO',
          },
        },
      },
      Requirement: {
        title: 'Requirement',
        description:
          'An atomic requirement. Requirements can specify the expected value that the response has to contain, or a range of threshold values within which the response has to fit in. The requirement may apply to a certain period of time',
        type: 'object',
        properties: {
          id: {
            title: 'ID',
            description: 'The identifier for this requirement',
            type: 'string',
          },
          title: {
            title: 'Title',
            description: 'Requirement title',
            type: ['string', 'null'],
          },
          description: {
            title: 'Description',
            description: 'Requirement description',
            type: ['string', 'null'],
          },
          dataType: {
            title: 'Data type',
            description: 'Requirement description',
            type: ['string', 'null'],
            enum: ['string', 'date-time', 'number', 'integer'],
          },
          expectedValue: {
            title: 'Expected value',
            description: 'Used to state the requirement when the response must be particular value',
            type: ['string', 'integer', 'number', 'null'],
          },
          minValue: {
            title: 'Min value',
            description:
              'Used to state the lower bound of the requirement when the response must be within a certain range',
            type: ['integer', 'number', 'null'],
          },
          maxValue: {
            title: 'Max value',
            description:
              'Used to state the upper bound of the requirement when the response must be within a certain range',
            type: ['integer', 'number', 'null'],
          },
          period: {
            title: 'Period',
            description:
              "Used to specify a particular period the requirement applies to, for example the bidder's turnover in a given year",
            $ref: '#/definitions/Period',
          },
          optionDetails: {
            title: 'Option Details',
            description: "Where options are applied 'Option Details' is used to capture this information",
            $ref: '#/definitions/OptionDetails',
          },
          unit: {
            type: 'object',
            title: 'Unit',
            description: 'Unit',
            $ref: '#/definitions/Unit',
          },
        },
      },
      RequirementGroup: {
        type: 'object',
        title: 'Requirement group',
        description:
          'A requirement group is a set of requirements that must be fulfilled together to validate a criterion.',
        required: ['id'],
        properties: {
          id: {
            description: 'The identifier for this requirement group ',
            type: 'string',
          },
          description: {
            description: 'Requirement group description',
            type: ['string', 'null'],
          },
          requirements: {
            title: 'Requirements',
            description: 'A list of any requirement which must all be satisfied for the requirement group to be met.',
            type: 'array',
            items: {
              $ref: '#/definitions/Requirement',
            },
          },
        },
      },
      Unit: {
        title: 'Unit',
        description:
          'A description of the unit in which the supplies, services or works are provided (e.g. hours, kilograms) and the unit-price. For comparability, an established list of units can be used.',
        type: 'object',
        properties: {
          name: {
            title: 'Name',
            description: 'Name of the unit',
            type: ['string', 'null'],
          },
          value: {
            title: 'Value',
            description: 'The monetary [Value] of a single unit.',
            $ref: '#/definitions/Value',
          },
          scheme: {
            title: 'Scheme',
            description:
              "The list from which units of measure identifiers are taken. Use of the scheme 'UNCEFACT' for the UN/CEFACT Recommendation 20 list of 'Codes for Units of Measure Used in International Trade' is recommended.",
            type: ['string', 'null'],
          },
          id: {
            title: 'ID',
            description:
              "The identifier from the codelist referenced in the scheme property. For example, with UNCEFACT, this is the value of the 'Common Code' column. From this identifier, applications can look-up the human readable name or symbol for this unit of measure. ",
            type: ['string', 'null'],
          },
          uri: {
            title: 'URI',
            description:
              'If the scheme used provide a machine-readable URI for this unit of measure, this can be given.',
            format: 'uri',
            type: ['string', 'null'],
          },
        },
      },
      Value: {
        title: 'Value',
        type: 'object',
        description: 'Financial value description',
        properties: {
          amount: {
            title: 'Amount',
            description: 'Amount as a number.',
            type: ['number', 'null'],
          },
          currency: {
            title: 'Currency',
            description:
              'The currency for each amount should always be specified using the uppercase 3-letter currency code from ISO4217.',
            type: ['string', 'null'],
          },
          valueAddedTaxIncluded: {
            title: 'A true/false field to indicate whether the value tax was included',
            type: 'boolean',
          },
        },
      },
    },
  };

  React.useEffect(() => {
    (async () => {
      // @ts-ignore
      const parsedSchema = await $RefParser.dereference(schema as JSONSchema7);
      setUnrefereedSchema(parsedSchema as JSONSchema7);
    })();
  }, []);

  return (
    <ThemeProvider>
      <Wrapper schema={unrefereedSchema} title="Category version" />
    </ThemeProvider>
  );
};

export default App;
