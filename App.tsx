import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register';

export default function App() {
  const [fonstsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if(!fonstsLoaded) {
    return <AppLoading />
  }

  const mockItem = {
    key: '1',
    name: 'Alimentação'
  }

  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  );
}