import React, {ChangeEvent, InputHTMLAttributes, KeyboardEvent, ReactNode, useState} from "react";
import clsx from "clsx";

type Props = {
    addItem: (title: string) => void
    label?: string
    trigger?: ReactNode
} & InputHTMLAttributes<HTMLInputElement>;


export const AddItemForm = React.memo((props: Props) => {
    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeypressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        if (newTitle.trim() !== '') {
            props.addItem(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    return <div className='AddItemForm'>
        <div className='AddItemForm__label'>{props.label}</div>
        <input
            {...props}
            value={newTitle}
            onChange={onChangeHandler}
            onKeyPress={onKeypressHandler}
            className={clsx('AddItemForm__input', {'error': error})}
        />
        <button className='AddItemForm__btn' onClick={addItem}>{props.trigger}</button>
        {error && <div className={'error-message'}>{error}</div>}

    </div>
})