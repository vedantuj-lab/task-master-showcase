import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header({ title }) {
  return (
    <View style={styles.header} testID="appHeader">
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200ee',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 4,
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
});
