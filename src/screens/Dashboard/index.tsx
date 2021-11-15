import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';

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
  LogoutButton,
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
  const [data, setData] = useState<IDataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = '@gofinances:transaticons';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormmated: IDataListProps[] = transactions
    .map((item: IDataListProps) => {
      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    });

    setData(transactionsFormmated);

  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

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

          <LogoutButton onPress={() => {}}>
            <PowerOffIcon />
          </LogoutButton>
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