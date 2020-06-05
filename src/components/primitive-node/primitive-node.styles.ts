import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

const KeyName = styled(Flex)`
  width: 150px;
`;

const Type = styled(Flex)`
  flex-shrink: 0;
`;

const SchemaTitle = styled(Text)`
  font-weight: 700;
`;
export default { KeyName, Type, SchemaTitle };
