import React, { useCallback, useEffect } from 'react'

import { RequestStatusType } from '@/app/app-reducer'
import { PlusSquareOutline, Trash } from '@/assets'
import { AddItemForm } from '@/common/components/AddItemForm'
import { EditableSpan } from '@/common/components/EditableSpan'
import { TaskStatuses } from '@/common/enums/common.enums'
import { useActions } from '@/common/hooks/useActions'
import { Task } from '@/features/TodolistList/Todolist/Task/Task'
import { TaskType } from '@/features/TodolistList/api/task-api'
import { tasksThunks } from '@/features/TodolistList/model/task-reducer'
import { FilterPropsType } from '@/features/TodolistList/model/todolists-reducer'
import clsx from 'clsx'

type Props = {
  addTask: (todolistId: string, title: string) => void
  changeFilter: (todolistId: string, filter: FilterPropsType) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  entityStatus: RequestStatusType
  filter: FilterPropsType
  id: string
  removeTask: (todolistId: string, taskId: string) => void
  removeTodolist: (id: string) => void
  tasks: TaskType[]
  title: string
}
export const Todolist = React.memo((props: Props) => {
  const { fetchTasks } = useActions(tasksThunks)

  useEffect(() => {
    fetchTasks(props.id)
  }, [])

  const addTask = useCallback(
    (title: string) => {
      props.addTask(props.id, title)
    },
    [props]
  )
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.id, title)
    },
    [props.changeTodolistTitle, props.id]
  )

  const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props])
  const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props])
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter(props.id, 'completed'),
    [props]
  )

  let taskForTodolist = props.tasks

  if (props.filter === 'active') {
    taskForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New)
  }
  if (props.filter === 'completed') {
    taskForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed)
  }

  return (
    <div className={'todo'}>
      <div className={'todo__body'}>
        <h3 className={'todo__title title'}>
          <EditableSpan onChange={changeTodolistTitle} title={props.title} />
          <button
            className={'todo__removeButton'}
            disabled={props.entityStatus === 'loading'}
            onClick={removeTodolist}
          >
            {
              <Trash
                className={`iconDelete ${props.entityStatus === 'loading' ? 'disabled' : ''}`}
              />
            }
          </button>
        </h3>
        <AddItemForm
          addItem={addTask}
          disabled={props.entityStatus === 'loading'}
          trigger={<PlusSquareOutline className={'icon'} />}
        />
        <div className={'todo__items'}>
          {taskForTodolist?.map(task => (
            <Task
              changeTaskStatus={props.changeTaskStatus}
              changeTaskTitle={props.changeTaskTitle}
              key={task.id}
              removeTask={props.removeTask}
              task={task}
              todolistId={props.id}
            />
          ))}
        </div>
        <div className={'todo__buttons-block'}>
          <button
            className={clsx('todo__btn', { activeFilter: props.filter === 'all' })}
            onClick={onAllClickHandler}
          >
            All
          </button>
          <button
            className={clsx('todo__btn', { activeFilter: props.filter === 'active' })}
            onClick={onActiveClickHandler}
          >
            Active
          </button>
          <button
            className={clsx('todo__btn', { activeFilter: props.filter === 'completed' })}
            onClick={onCompletedClickHandler}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  )
})
