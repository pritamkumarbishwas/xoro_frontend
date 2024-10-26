import * as actionTypes from "../actionTypes";

const initialState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
  success: false,
};

const taskReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false,
        error: null,
        success: true,
      };

    case actionTypes.SET_TASK:
      return {
        ...state,
        task: payload,
        loading: false,
        error: null,
        success: true,
      };

    case actionTypes.CREATE_TASK:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case actionTypes.CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, payload],
        loading: false,
        error: null,
        success: true,
      };

    case actionTypes.CREATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };

    case actionTypes.UPDATE_TASK:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case actionTypes.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === payload.id ? payload : task
        ),
        task: payload,
        loading: false,
        error: null,
        success: true,
      };

    case actionTypes.UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };

    case actionTypes.DELETE_TASK:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case actionTypes.DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload),
        loading: false,
        error: null,
        success: true,
      };

    case actionTypes.DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };

    default:
      return state;
  }
};

export default taskReducer;
