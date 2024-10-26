import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import { ApiRequest } from "../../utils/ApiRequest.js"; 
import { api_url, tasks } from "../../utils/Constants"; 
import {
  setTasks,
  setTask,
  getTasks,
  createTaskSuccess,
  createTaskFailure,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskSuccess,
  deleteTaskFailure,
} from "../Actions/taskActions.js"; 
import Swal from "sweetalert2";

function* getTasksSaga() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + tasks, // Use tasks instead of banner
    });

    if (response?.success) {
      yield put(setTasks(response.data));
    } else {
      yield put(createTaskFailure(response.message));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch tasks",
      });
    }
  } catch (error) {
    yield put(createTaskFailure(error.message));
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getTaskByIdSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${tasks}/${payload}`, // Use tasks instead of banner
    });

    if (response?.success) {
      yield put(setTask(response.data));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch the task",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}

function* deleteTaskSaga(action) {
  try {
    const { payload } = action;
    const result = yield Swal.fire({
      title: `Are you sure you want to delete this task?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${tasks}/${payload}`, // Use tasks instead of banner
      });

      if (response?.success) {
        yield put(deleteTaskSuccess(payload));
        yield put(getTasks());
        yield Swal.fire({
          title: "Deleted!",
          text: "The task has been deleted successfully.",
          icon: "success",
        });
      } else {
        yield put(deleteTaskFailure(response.message));
        yield Swal.fire({
          title: "Deletion Failed",
          text: "Failed to delete the task. Please try again.",
          icon: "error",
        });
      }
    }
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
    yield Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}

function* createTaskSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { payload } = action;

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + tasks, // Use tasks instead of banner
      data: payload,
    });

    if (response?.success) {
      yield put(getTasks());
      yield put(createTaskSuccess(response.data));
      Swal.fire({
        icon: "success",
        title: "Task Created",
        text: "The task has been successfully created.",
      });
    } else {
      yield put(createTaskFailure(response.message));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to create task",
      });
    }
  } catch (error) {
    yield put(createTaskFailure(error.message));
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateTaskSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const { id, data } = action.payload;

    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${tasks}/${id}`, // Use tasks instead of banner
      data: data,
    });

    if (response?.success) {
      yield put(getTasks());
      yield put(updateTaskSuccess(response.data));
      Swal.fire({
        icon: "success",
        title: "Task Updated",
        text: "The task has been successfully updated.",
      });
    } else {
      yield put(updateTaskFailure(response.message));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to update task",
      });
    }
  } catch (error) {
    yield put(updateTaskFailure(error.message));
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

export default function* taskSaga() {
  yield takeLeading(actionTypes.GET_TASKS, getTasksSaga);
  yield takeLeading(actionTypes.GET_TASK_BY_ID, getTaskByIdSaga);
  yield takeLeading(actionTypes.DELETE_TASK, deleteTaskSaga);
  yield takeLeading(actionTypes.CREATE_TASK, createTaskSaga);
  yield takeLeading(actionTypes.UPDATE_TASK, updateTaskSaga);
}
