import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';

const TaskManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  max-width: 100%;
  max-height: 225px;
  overflow-y: auto;
  background: transparent;
  border-radius: 10px;
  color: white;
  font-family: 'VT323';
`;

const TaskInput = styled.input`
  font-size: 20px;
  font-family: 'VT323';
  text-transform: uppercase;
  padding: 5px;
  margin: 0px;
  background: transparent;
  border: none;
  color: white;
  outline: none;
  text-align: center;
`;

const TaskButton = styled.button`
  margin: 6px;
  text-transform: uppercase;
  font-size: 20px;
  color: white;
  font-family: 'VT323';
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 5px;
  background: black;
  z-index: 2;

  button:active {
    top: 2px;
  }
  button::before,
  button::after {
    content: '';
    display: block;
    position: absolute;
    background: black;
    z-index: -1;
  }
  button::before {
    top: 10px;
    bottom: 10px;
    left: -10px;
    right: -10px;
  }
  button::after {
    top: 4px;
    bottom: 4px;
    left: -6px;
    right: -6px;
  }
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0px;
  width: 100%;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid white;
`;

const TaskText = styled.span`
  flex: 1;
  text-align: left;
`;

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <Draggable
      initialX={window.innerWidth / 2}
      initialY={window.innerHeight / 2 + 200}
    >
      <TaskManagerContainer>
        <TaskInput
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder='Add a new task'
        />
        <TaskButton onClick={addTask}>Add Task</TaskButton>
        <TaskList>
          {tasks.map((task, index) => (
            <TaskItem key={index}>
              <TaskText
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.text}
              </TaskText>
              <TaskButton onClick={() => toggleTaskCompletion(index)}>
                {task.completed ? 'Undo' : 'Complete'}
              </TaskButton>
              <TaskButton onClick={() => deleteTask(index)}>Delete</TaskButton>
            </TaskItem>
          ))}
        </TaskList>
      </TaskManagerContainer>
    </Draggable>
  );
};

export default TaskManager;
