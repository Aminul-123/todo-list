import { useState } from "react"

const initialTodo = [
  {
    heading : 'Reading',
    desc : 'Reading computer science book',
    id: 63663
  },
  {
    heading : 'Morning Walk',
    desc : 'Morning walk at 5 AM.',
    id : 3737
  }
]
export default function App () {
  return (
    <>
    <main>
       <Todo />

    </main>
    </>
  )
}
function Todo () {

  const [todo, setTodo] = useState(initialTodo);

  function newTodos (newTodo) {
      setTodo((oldtodos) => [...oldtodos, newTodo])
  }
  function handleDelete (id) {
    setTodo((oldtodos) => oldtodos.filter((newTodo) => newTodo.id !== id));
  }
  return (
    <>
    <CreateTodo newTodos={newTodos}  />
    <TodoList todo={todo} handleDelete={handleDelete} />
    </>
  )
}
function CreateTodo ({newTodos}) {
  //first create static application , then design , then add interactivity
  const [openCreate , setOpenCreate] = useState(false)
  const [heading, setHeading] = useState('');
  const [desc, setDesc] = useState('');

  function handleSubmit (e) {
    e.preventDefault();

    if (!heading || !desc) return;

    const newTodo = {
      heading,
      desc,
      id: crypto.randomUUID()
    }
   // console.log(newTodo)
    newTodos(newTodo);

    setHeading('');
    setDesc('');
  }


  return (
    <>
        <div>
            <button onClick={() => setOpenCreate((open) => !open)}>
              {
                openCreate ? 'Close current Todo': 'Create Todo'
              }
            </button>
        </div>
        {
          openCreate && (
        <form className="create" onSubmit={handleSubmit}>
          <div>

             <div>
             <label htmlFor="heading">Add Heading : </label>
              <input type="text" id="heading" placeholder="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              />
          </div>
          <div>
            <label htmlFor="desc">Description : </label>
            <textarea id="desc" placeholder="Enter description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            ></textarea>
               </div>
            </div>
          <button>Create</button>
        </form>
            
          )
        }
    </>
  )
}

function TodoList ({todo, handleDelete}) {
  return (
    <>

    {todo.map((t, idx) => (
      
      <Todos todo={todo} key={idx} heading={t?.heading} id ={t?.id} desc={t?.desc} 
      handleDelete={handleDelete}
      />
    ))}
     
    
    </>
  )
}

function Todos ({todo, heading, desc, id, handleDelete}) {
  return (
    <>
    <div className="container">
      <div >
        <h3>{heading}</h3>
        <p>{desc}</p>
      </div>
      <button onClick={() => handleDelete(id)}>
        Delete
      </button>
    </div>
    </>
  )
}