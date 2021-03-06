import React, { FC } from 'react';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

export const ErrorComponent: FC = () => {
  return (
    <Flex alignment={{ horizontal: 'center', vertical: 'center' }} direction="column">
      <Text color="var(--c-negative)">Invalid JSON Schema</Text>

      <Text color="var(--c-dark)" variant="small">
        If you are sure this schema is valid, please
        <a rel="noreferrer" target="_blank" href="https://github.com/uStudioCompany/u-json-docs/issues">
          create an issue.
        </a>
      </Text>
    </Flex>
  );
};
