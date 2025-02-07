import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
  },
  reducers: {
    SetUser: (state, action) => {
      state.users = action.payload;
    },
    AddUsers: (state, action) => {
      state.users.push(action.payload);
    },
    UpdateUser: (state, action) => {
      const {userId, updatedData} = action.payload;
      const userIndex = state.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex] = {...state.users[userIndex], ...updatedData};
      }
    },
    DeleteUser: (state, action) => {
      const {userId} = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
    },
    AssignTaskToUser: (state, action) => {
      const {userId, taskId} = action.payload;
      console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPP', userId);
      console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOO', taskId);

      const user = state.users.find(user => user.id === userId);
      if (user) {
        if (!user.tasks) {
          user.tasks = [];
        }
        if (!user.tasks.includes(taskId)) {
          user.tasks.push({taskId, status: 'In Progress'});
        }
      }
    },
    ChangeTaskStatus: (state, action) => {
      const {userId, taskId, status} = action.payload;

      const user = state.users.find(user => user.id === userId);
      if (user) {
        const task = user.tasks.find(task => task.taskId === taskId);
        if (task) {
          task.status = status;
        }
      }
    },
  },
});
export const {
  AddUsers,
  SetUser,
  UpdateUser,
  DeleteUser,
  AssignTaskToUser,
  ChangeTaskStatus,
} = userSlice.actions;
export default userSlice.reducer;
