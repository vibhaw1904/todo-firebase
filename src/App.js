import './App.css';
import React,{useState,useEffect} from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import Todo from './components/Todo';
import {db} from './firebase';
import {query,collection, onSnapshot, QuerySnapshot,updateDoc,doc, addDoc, deleteDoc} from 'firebase/firestore';
import { async } from '@firebase/util';
const style={
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#d3dce6] to-[#1fb6ff]`,
  container:`bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-lg p-4 	`,
  heading:`text-3xl font-bold text-center text-grey-700 p-2`,
  form:`flex justify-between`,
  input:`rounded-md
  border p-2 w-full text-xl
  hover:cursor-pointer hover:bg-amber-50
  hover:text-amber-700`,
  button: `border p-4 ml-2 bg-blue-400 text-slate-100 rounded-md
  hover:bg-blue-300`,
  count:`text-center p-2 font-bold text-blue-300 text-xl`


}


function App() {
   const[todos,setTodos]=useState([]);
   const[input,setInput]=useState('');

//update todo
 const toggleComplete=async(todo)=>{
  await updateDoc(doc(db,'todos',todo.id),{
    completed:!todo.completed
  })
 };

 //create todo

 const createTodo=async(e)=>{
  e.preventDefault(e)
  if(input===''){
    alert('Please enter a valid to do')
    return;
  }
  await addDoc(collection(db,'todos'),{
    text:input,
    completed:false
  })
  setInput('')
 };
//delete todo
 const deleteTodo=async(id)=>{
  await deleteDoc(doc(db,'todos',id))
 }




//reading from firebase

 useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);




  return (
    <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>To Do App</h3>
          <form  onSubmit={createTodo} className={style.form}>
            <input value={input} onChange={(e)=>setInput(e.target.value)} className={style.input} type="text" placeholder='Add a task'/>
            <button type="" className={style.button}><AiOutlinePlus size={30}/></button>
          </form>
          <ul>
            {todos.map((todo,index)=>(
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
            ))}
            
          </ul>
          {todos.length<1?null:  <p className={style.count}>{`You have ${todos.length} to do` }</p>}
        
        </div>
    </div>
  );
}

export default App;
