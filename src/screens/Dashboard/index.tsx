import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { useTheme } from 'styled-components';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, ITransactionProps } from '../../components/TransactionCard';

import {
  Container,
  LoadContainer,
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

interface IHighlightProps {
  amount: string;
  lastTransaction: string;
}

interface IHighlightData {
 entries: IHighlightProps;
 expensives: IHighlightProps;
 total: IHighlightProps;
}

export function Dashboard() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<IHighlightData>({} as IHighlightData);

  function getLasTransactionData(collection: IDataListProps[], type: 'positive' | 'negative') {
    const lastTransaction = new Date(
      Math.max.apply(Math, collection
        .filter((transaction) => transaction.type === type)
        .map((transaction) => new Date(transaction.date).getTime())));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleDateString('pt-BR', {
      month: 'long'
    })}`
  }

  async function loadTransactions() {
    const dataKey = '@gofinances:transaticons';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionsFormmated: IDataListProps[] = transactions
    .map((item: IDataListProps) => {

      if(item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensivesTotal += Number(item.amount);
      }

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

    setTransactions(transactionsFormmated);

    const lastTransactionEntries = getLasTransactionData(transactions, 'positive');
    const lastTransactionExpensives = getLasTransactionData(transactions, 'negative');
    const totalInterval = `01 a ${lastTransactionExpensives}`

    const total = entriesTotal - expensivesTotal;

    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pr-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Ultima entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensivesTotal.toLocaleString('pr-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Ultima saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pr-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval,
      }
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
        isLoading ? (
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer>
        ) :
        <>
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
              amount={highLightData.entries.amount}
              lastTransaction={highLightData.entries.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highLightData.expensives.amount}
              lastTransaction={highLightData.expensives.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Entradas"
              amount={highLightData.total.amount}
              lastTransaction={highLightData.total.lastTransaction}
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={( item ) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      }
    </Container>)
  ;
}