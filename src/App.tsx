import React from 'react';
import './App.css';

function App() {

    return (
        <div className="App">
            <Todolist/>
            <Todolist/>
            <Todolist/>
        </div>
    );
}

const Todolist = () => {

    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/><span>HTML&CSS</span></li>
                <li><input type="checkbox" checked={true}/><span>JavaScript</span></li>
                <li><input type="checkbox" checked={false}/><span>React</span></li>
            </ul>
            <div >
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default App;
