import React, { useEffect, useState } from 'react';
import Add from './Add'; 
import Edit from './Edit'; 
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../redux/Actions/taskActions';

const List = () => {
  const dispatch = useDispatch();

  const [filterText, setFilterText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const tasks = useSelector((state) => state.task.tasks); 

  useEffect(() => {
    dispatch(getTasks()); 
  }, [dispatch]);

  const filteredTasks = tasks.filter(task => {
    const matchesText = task.title.toLowerCase().includes(filterText.toLowerCase());
    const matchesStatus = selectedStatus ? task.status === selectedStatus : true;
    return matchesText && matchesStatus;
  });

  const handleEdit = (task) => {
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleSave = (updatedTask) => {
    dispatch(updateTask(updatedTask.id, updatedTask)); 
    setIsEditModalOpen(false); 
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-5 antialiased">
      <div className="mx-auto max-w-screen-xl my-8 px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <header className="bg-primary-600 text-white p-4 text-center">
            <h1 className="text-2xl font-bold">Task Management</h1>
          </header>

          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <input 
                    type="text" 
                    id="simple-search" 
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    placeholder="Search" 
                    required 
                  />
                  <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 16h4m-2-2v4m-2-4a6 6 0 100-12 6 6 0 000 12z" />
                  </svg>
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <div className="relative">
                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <button 
                type="button" 
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                onClick={() => setIsAddModalOpen(true)}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 00-1 1v7H2a1 1 0 000 2h7v7a1 1 0 002 0v-7h7a1 1 0 000-2h-7V3a1 1 0 00-1-1z" />
                </svg>
                Add Task
              </button>
            </div>
          </div>

          {/* Table for tasks */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-4">sNo</th>
                  <th className="px-4 py-4">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                      Record Not Found
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task, index) => (
                    <tr key={task.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3">{index + 1}</td> {/* Serial number */}
                      <th className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{task.title}</th>
                      <td className="px-4 py-3">{task.description}</td>
                      <td className="px-4 py-3">{task.status}</td>
                      <td className="px-4 py-3 flex items-center justify-end space-x-2">
                        <button 
                          className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover:bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" 
                          type="button"
                          onClick={() => handleEdit(task)}
                        >
                          {/* Edit icon */}
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M15.232 1.232a3 3 0 00-4.244 0l-8 8a3 3 0 00-.707 1.414l-1.732 6.928a1 1 0 001.224 1.224l6.928-1.732a3 3 0 001.414-.707l8-8a3 3 0 000-4.244zM14.121 3.879l1.414 1.414L14.121 6.707 12.707 5.293 14.121 3.879zM10 14.414l-1.414 1.414-1.414-1.414H10zm3-3l-1.414 1.414-3-3L10 8l3 3zm2.414 5.414l-2 2-1.414-1.414 2-2 1.414 1.414z"/>
                          </svg>
                        </button>
                        <button 
                          className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover:bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" 
                          type="button"
                          onClick={() => handleDelete(task._id)}
                        >
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 3a1 1 0 011-1h8a1 1 0 011 1v2H5V3zM3 5h14v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm4 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Add 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
            onSave={(newTask) => {
              dispatch(createTask(newTask)); 
              setIsAddModalOpen(false);
            }} 
          />
          
          <Edit 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            task={editTask} 
            onSave={handleSave} 
          />
        </div>
      </div>
    </section>
  );
};

export default List;
