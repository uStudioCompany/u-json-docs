import React from 'react';
import Text from 'ustudio-ui/components/Text'
import Flex from 'ustudio-ui/components/Flex'

type ErrorType = {
  error: Error;
}


export const ErrorComponent = ({ error }: ErrorType) => {
  return (
    <Flex alignment={{horizontal: 'center',vertical: 'center'}} direction='column'>
      <Text color='var(--c-negative)'>Something went wrong: </Text>
       <Text color='var(--c-negative)'> {error.message}</Text>
    </Flex>
  );
};
