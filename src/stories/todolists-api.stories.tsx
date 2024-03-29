import { useState } from 'react'

import { tasksAPI } from '@/features/TodolistList/api/tasksAPI'
import { todolistAPI } from '@/features/TodolistList/api/todolistAPI'

export default {
  title: 'API',
}
export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)

  const getTodo = () => {
    todolistAPI.getTodolist().then(res => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <button onClick={getTodo}>Get Todo</button>
    </div>
  )
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState('')
  const createTodo = () => {
    todolistAPI.createTodolist(title).then(res => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          onChange={e => {
            setTitle(e.currentTarget.value)
          }}
          value={title}
        />
        <button onClick={createTodo}>Create Todo</button>
      </div>
    </div>
  )
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')

  const deleteTodo = () => {
    todolistAPI.deleteTodolist(todolistId).then(res => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          onChange={e => {
            setTodolistId(e.currentTarget.value)
          }}
          placeholder={'todolistId'}
          value={todolistId}
        />
        <button onClick={deleteTodo}>Delete Todo</button>
      </div>
    </div>
  )
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')
  const [title, setTitle] = useState('')
  const updateTodo = () => {
    todolistAPI.updateTodolist({ id: todolistId, title }).then(res => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          onChange={e => {
            setTodolistId(e.currentTarget.value)
          }}
          placeholder={'todolistId'}
          value={todolistId}
        />
        <input
          onChange={e => {
            setTitle(e.currentTarget.value)
          }}
          placeholder={'title'}
          value={title}
        />
        <button onClick={updateTodo}>Update Todo</button>
      </div>
    </div>
  )
}

export const GetTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')
  const getTask = () => {
    tasksAPI.getTask(todolistId).then(res => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          onChange={e => {
            setTodolistId(e.currentTarget.value)
          }}
          placeholder={'todolistId'}
          value={todolistId}
        />
        <button onClick={getTask}>Get Task</button>
      </div>
    </div>
  )
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const createTask = () => {
    tasksAPI.createTask(todolistId, title).then(res => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          onChange={e => {
            setTodolistId(e.currentTarget.value)
          }}
          placeholder={'todolistId'}
          value={todolistId}
        />
        <input
          onChange={e => {
            setTitle(e.currentTarget.value)
          }}
          placeholder={'title'}
          value={title}
        />
        <button onClick={createTask}>Create Task</button>
      </div>
    </div>
  )
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')
  const [taskId, setTaskId] = useState('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)

  const updateTask = () => {
    tasksAPI
      .updateTask(todolistId, taskId, {
        deadline: '',
        description: description,
        priority: priority,
        startDate: '',
        status: status,
        title: title,
      })
      .then(res => {
        setState(res.data)
      })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          onChange={e => {
            setTodolistId(e.currentTarget.value)
          }}
          placeholder={'todolistId'}
          value={todolistId}
        />
        <input
          onChange={e => {
            setTaskId(e.currentTarget.value)
          }}
          placeholder={'taskId'}
          value={taskId}
        />
        <input
          onChange={e => {
            setTitle(e.currentTarget.value)
          }}
          placeholder={'title'}
          value={title}
        />
        <input
          onChange={e => {
            setDescription(e.currentTarget.value)
          }}
          placeholder={'description'}
          value={description}
        />
        <input
          onChange={e => {
            setStatus(+e.currentTarget.value)
          }}
          placeholder={'status'}
          value={status}
        />
        <input
          onChange={e => {
            setPriority(+e.currentTarget.value)
          }}
          placeholder={'priority'}
          value={priority}
        />
        <button onClick={updateTask}>Update Task</button>
      </div>
    </div>
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')
  const [taskId, setTaskId] = useState<string>('')
  const deleteTask = () => {
    tasksAPI.deleteTask(todolistId, taskId).then(res => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          onChange={e => setTodolistId(e.currentTarget.value)}
          placeholder={'todolistId'}
          value={todolistId}
        />
        <input
          onChange={e => setTaskId(e.currentTarget.value)}
          placeholder={'taskId'}
          value={taskId}
        />
        <button onClick={deleteTask}>del task</button>
      </div>
    </div>
  )
}
