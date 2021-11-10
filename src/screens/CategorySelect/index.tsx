import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer
} from './styles';

interface ICategoryItem {
  key: string;
  name: string;
}

interface ICategorySelectProps {
  category: ICategoryItem;
  onSetCategory: (category: ICategoryItem) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect ({ category, onSetCategory, closeSelectCategory }: ICategorySelectProps) {
  
  function handleCategorySelect (item: ICategoryItem) {
    onSetCategory(item);
  }

  return (
    <Container>
      <Header>
        <Title>{category.name}</Title>
      </Header>

      <FlatList
          data={categories}
          style={{ flex: 1, width: '100%' }}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Category
              onPress={() => handleCategorySelect(item)}
              isActive={category.key === item.key}
            >
              <Icon name={item.icon} />
              <Name>{item.name}</Name>
            </Category>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />

      <Footer>
        <Button
          title="Selecionar"
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  );
}
