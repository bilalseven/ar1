import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MainScreen } from './components/screens/MainScreen';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MainScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;