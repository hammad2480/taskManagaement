import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {search} from '../assets/svgs';

const SearchBar = ({onSearch}) => {
  const [text, setText] = useState('');

  const handleClear = () => {
    setText('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <SvgXml width={20} height={20} xml={search} />
      <TextInput
        style={styles.input}
        placeholderTextColor={'#FF6B6B'}
        placeholder="Search..."
        value={text}
        onChangeText={t => {
          setText(t);
          onSearch(t);
        }}
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    // margin: 10,
    borderWidth: 1,
    borderColor: '#FFA69E',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    padding: 8,
  },
  clearText: {
    fontSize: 18,
    color: '#999',
  },
});

export default SearchBar;
