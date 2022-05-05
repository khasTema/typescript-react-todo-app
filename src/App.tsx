import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import ToDoList from './components/ToDoList';
import { Todo } from './components/model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';



const App: React.FC= () => { 

  const [ toDo, setToDo ] = useState<string>('');
  const [ toDoS, setToDoS ] = useState<Todo[]>([]); 
  const [ completedTodos, setCompletedTodos ] = useState<Todo[]>([])

  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault(); 
    if (toDo){
      setToDoS([...toDoS, {
        id: Date.now(), 
        todo: toDo, 
        isDone: false
      }]);
      setToDo('');
    };   
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add,
        active = toDoS,
        complete = completedTodos;

    if(source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1)
    }else{
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if(destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add)
    }else{
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete);
    setToDoS(active);
  }

  return ( 
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Tasker</span>
        <InputField toDo={toDo} setToDo={setToDo} handleAdd={handleAdd}/>
        <ToDoList 
          todos={toDoS} 
          setTodos={setToDoS}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>  
  );
}

export default App;
