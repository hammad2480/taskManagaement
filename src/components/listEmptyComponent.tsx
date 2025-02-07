import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {empty} from '../assets/svgs';

const ListEmptyComponent = ({txt, isSmallList}) => (
  <View style={styles.emptyContainer}>
    <SvgXml
      xml={empty}
      width={isSmallList ? 100 : 200}
      height={isSmallList ? 100 : 200}
    />
    <Text style={styles.emptyText}>{txt}</Text>
  </View>
);

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
});

export default ListEmptyComponent;
