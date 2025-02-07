import {createSlice} from '@reduxjs/toolkit';

export const TaskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
  },
  reducers: {
    AddTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    UpdateTask: (state, action) => {
      const {taskId, updatedData} = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {...state.tasks[taskIndex], ...updatedData};
      }
    },

    DeleteTask: (state, action) => {
      const {taskId} = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    AssignUserToTask: (state, action) => {
      const {userId, taskId} = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        if (!task.users) {
          task.users = [];
        }
        if (!task.users.includes(userId)) {
          task.users.push({userId, status: 'In Progress'});
        }
      }
    },
    ChangeUserStatus: (state, action) => {
      const {userId, taskId, status} = action.payload;
      const task = state.tasks.find(task => task.id === taskId);

      if (task) {
        const userTask = task.users?.find(user => user.userId === userId);

        if (userTask) {
          userTask.status = status;
        } else {
          console.log('User not assigned to this task');
        }
      } else {
        console.log('Task not found');
      }
    },
  },
});

export const selectTasksByIds = (state, taskIds) =>
  state.task.tasks.filter(task => taskIds.includes(task.id));

export const {
  AddTask,
  UpdateTask,
  DeleteTask,
  AssignUserToTask,
  ChangeUserStatus,
} = TaskSlice.actions;
export default TaskSlice.reducer;
