import * as actionTypes from "../actionTypes";

// Action to get all tasks
export const getTasks = () => ({
  type: actionTypes.GET_TASKS,
});

// Action to set tasks in the state
export const setTasks = (payload) => ({
  type: actionTypes.SET_TASKS,
  payload,
});

// Action to get a specific task by ID
export const getTaskById = (payload) => ({
  type: actionTypes.GET_TASK_BY_ID,
  payload, // ID of the task to fetch
});

// Action to set a specific task
export const setTask = (payload) => ({
  type: actionTypes.SET_TASK,
  payload,
});

// Action to create a new task
export const createTask = (payload) => ({
  type: actionTypes.CREATE_TASK,
  payload,
});

// Action to indicate successful task creation
export const createTaskSuccess = (payload) => ({
  type: actionTypes.CREATE_TASK_SUCCESS,
  payload,
});

// Action to indicate failed task creation
export const createTaskFailure = (payload) => ({
  type: actionTypes.CREATE_TASK_FAILURE,
  payload,
});

// Action to update an existing task
export const updateTask = (id, taskData) => ({
  type: actionTypes.UPDATE_TASK,
  payload: {
    id,        // Include the ID in the payload
    data: taskData, // Include the task data in the payload
  },
});

// Action to indicate successful task update
export const updateTaskSuccess = (payload) => ({
  type: actionTypes.UPDATE_TASK_SUCCESS,
  payload,
});

// Action to indicate failed task update
export const updateTaskFailure = (payload) => ({
  type: actionTypes.UPDATE_TASK_FAILURE,
  payload,
});

// Action to delete a task
export const deleteTask = (payload) => ({
  type: actionTypes.DELETE_TASK,
  payload, // Task ID
});

// Action to indicate successful task deletion
export const deleteTaskSuccess = (payload) => ({
  type: actionTypes.DELETE_TASK_SUCCESS,
  payload,
});

// Action to indicate failed task deletion
export const deleteTaskFailure = (payload) => ({
  type: actionTypes.DELETE_TASK_FAILURE,
  payload,
});
