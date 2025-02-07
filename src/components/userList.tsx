import SearchBar from './Searchbar';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import ListEmptyComponent from './listEmptyComponent';
const UserList = ({title, users, task, navigation, disabled}) => {
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = txt => {
    if (!txt) {
      setFilteredUsers(users);
      return;
    }
    setFilteredUsers(
      users.filter(user => user.name.toLowerCase().includes(txt.toLowerCase())),
    );
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>

      <SearchBar onSearch={handleSearch} />
      {filteredUsers.length === 0 ? (
        <View style={styles.emptyCard}>
          <ListEmptyComponent isSmallList={true} txt={`No ${title}`} />
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {filteredUsers.slice(0, 3).map(user => (
            <TouchableOpacity
              disabled={disabled}
              key={user.id}
              onPress={() =>
                navigation.navigate('TaskAssign', {
                  user,
                  task,
                  status:
                    user?.tasks?.find(item => item?.taskId === task?.id)
                      ?.status || 'Not Assigned',
                })
              }
              style={styles.card}>
              <Image source={{uri: user.image}} style={styles.avatar} />
              <View style={styles.infoContainer}>
                <View style={styles.contentContainer}>
                  <Text style={styles.name}>{user.name}</Text>
                  <View style={styles.statusView}>
                    <View
                      style={[
                        styles.statusColor,
                        {
                          backgroundColor:
                            user?.tasks?.find(item => item?.taskId === task?.id)
                              ?.status == 'Completed'
                              ? 'green'
                              : user?.tasks?.find(
                                  item => item?.taskId === task?.id,
                                )?.status == 'In Progress'
                              ? 'yellow'
                              : 'red',
                        },
                      ]}
                    />
                    <Text style={styles.status}>
                      {user?.tasks?.find(item => item?.taskId === task?.id)
                        ?.status || 'Not Assigned'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.role}>{user.role}</Text>
                <Text style={styles.email}>{user.email}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  header: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: '10%',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    marginTop: '2%',
    paddingBottom: 20,
  },
  emptyCard: {
    backgroundColor: '#FFE4E1',
    padding: 20,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {marginBottom: 15},
  label: {fontSize: 16, fontWeight: 'bold', marginBottom: 5},
  inputWrapper: {flexDirection: 'row', alignItems: 'center'},
  input: {
    borderColor: '#ccc',
    opacity: 0.7,
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    fontSize: 16,
    padding: 8,
    paddingLeft: 10,
  },
  editableInput: {backgroundColor: '#f5f5f5', borderColor: 'black', opacity: 1},
  editIcon: {marginLeft: 10},
  errorText: {color: 'red', fontSize: 12, marginTop: 5},
  saveButton: {
    backgroundColor: 'blue',
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
  },
  deleteButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
    bottom: 40,
  },
  saveButtonText: {color: 'white', fontSize: 16},
  deleteButtonText: {color: 'red', fontSize: 16},
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginVertical: '5%',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFE4E1',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  avatar: {width: 50, height: 50, borderRadius: 25, marginRight: 10},
  infoContainer: {flex: 1},
  name: {fontSize: 16, fontWeight: 'bold'},
  role: {fontSize: 14, color: '#666'},
  email: {fontSize: 14, color: '#888'},
  status: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  statusView: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusColor: {
    width: 8,
    height: 8,
    borderRadius: 100,
  },
});

export default UserList;
