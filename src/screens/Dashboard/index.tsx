import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, ITransactionProps } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  PowerOffIcon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from './styles';

export interface IDataListProps extends ITransactionProps {
  id: string;
}

export function Dashboard() {
  const data: IDataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "13/04/2020"
    },
    {
      id: '2',
      type: 'negative',
      title: "Hamburgeria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "10/04/2020"
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "shopping-bag",
      },
      date: "10/04/2020"
    }
]

  return (
    <Container>
      <Header>
        <UserWapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/16033906?v=4' }} />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Hitalo</UserName>
            </User>
          </UserInfo>

          <PowerOffIcon />
        </UserWapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abrou"
          type="up"
        />
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abrou"
          type="down"
        />
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abrou"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={( item ) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>)
  ;
}