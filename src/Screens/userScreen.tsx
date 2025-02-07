import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {plus} from '../assets/svgs';
import {useSelector} from 'react-redux';
import ListEmptyComponent from '../components/listEmptyComponent';

const UserScreen = ({navigation}) => {
  const {users} = useSelector(state => state?.user);
  console.log('>>>>>>>>>>>>>>>>>>>>>', users);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserDetail', {user: item})}
      style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Available Users! 👨‍💼</Text>

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => <ListEmptyComponent txt={'No User Found!'} />}
        contentContainerStyle={
          users?.length === 0 ? styles.flatListContainer : {}
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateUser')}>
        <SvgXml width={20} height={20} xml={plus} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAE3',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4E1',
    padding: 15,
    marginBottom: 10,
    borderRadius: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  role: {
    fontSize: 14,
    color: '#FF5E78',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 130,
    backgroundColor: '#FF6B6B',
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
});

export default UserScreen;
