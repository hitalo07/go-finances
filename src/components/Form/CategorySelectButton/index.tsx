import React from 'react';

import {
  Container,
  Category,
  Icon
} from './styles';

interface ICategorySelectProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton ({
  title,
  onPress
}: ICategorySelectProps) {
  return (
    <Container onPress={onPress}>
      <Category>{ title }</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}

export default CategorySelectButton;