import React, { FC } from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

export const Property: FC<{ title: string; value: string | number }> = ({ title, value }) => (
  <Flex alignment={{ vertical: 'center' }}>
    <Text variant="small">{title}:&nbsp;</Text>

    <Text variant="code">{value}</Text>
  </Flex>
);
