import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'completed' | 'active';

type TasksStateType = {
    [key: string]: Array<TaskType>
}


export const App = () => {

    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    };

    const removeTask = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)})
    };

    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    };

    const changeFilter = (todolistID: string, value: FilterValueType) => {
        setTodolist(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    };

    const removeTodolist = (todolistId: string) => {
        setTodolist(todolists.filter(el => el.id !== todolistId));
        delete tasks[todolistId];
        setTasks({...tasks})
    };

    const addTodolist = (title: string) => {
        let newId = v1();
        let newTodolist: TodolistType = {id: newId, title: title, filter: "all"};
        setTodolist([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    };

    const changeTaskTitle = (todolistId: string, id: string, newValue: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: newValue} : el)})
    }

    const todolistIs_1 = v1();
    const todolistIs_2 = v1();

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistIs_1, title: 'What to learn', filter: "all"},
        {id: todolistIs_2, title: 'What to buy', filter: "all"},
    ]);


    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistIs_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'Angular', isDone: false},

        ],
        [todolistIs_2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>

            {todolists.map((el) => {

                let taskForTodolist = tasks[el.id];

                if (el.filter === 'completed') {
                    taskForTodolist = taskForTodolist.filter(el => el.isDone === true)
                }

                if (el.filter === 'active') {
                    taskForTodolist = taskForTodolist.filter(el => el.isDone === false)
                }

                return (
                    <div>

                        <Todolist
                            key={el.id}
                            id={el.id}
                            title={el.title}
                            tasks={taskForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={el.filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                        />
                    </div>

                );
            })}
        </div>
    );
}