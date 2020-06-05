import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

const Tag = styled.div`
  width: 8px;
  height: 8px;

  border-radius: 10px;
  background-color: var(--c-negative);

  overflow: hidden;

  transition: all var(--i-transition);

  font-weight: 400;
  text-align: center;
  color: var(--c-negative);
`;

const KeyName = styled(Flex)`
  width: 300px;
  }
`;

const Node = styled(Flex)`
  &:hover {
    ${Tag} {
      text-indent: 0;
      width: auto;
      height: 12px;
      color: var(--c-lightest);
      padding: 0 var(--i-small);
    }
  }
`;

const Type = styled(Flex)(
  ({ marginRight }: { marginRight: string }) => css`
    margin-right: ${marginRight};
    flex-shrink: 0;
  `
);

const SchemaTitle = styled(Text)`
  font-weight: 700;
`;

const TagText = styled(Text)`
  line-height: 1;
  font-size: 0.75rem;
`;

export default { KeyName, Type, SchemaTitle, Tag, Node, TagText };
