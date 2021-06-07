import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
// import { FaCloudMeatball } from "react-icons/fa";

const getLocalStorage = () =>{
  let List = localStorage.getItem('list');
  if(List){
   return JSON.parse(localStorage.getItem('list'))
  }
  return []
}
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter todo");
    } else if (name && editing) {
      setList(list.map((item)=>{
        if(item.id===editId){
          return {...item, title:name}
        }
        return item
      }))
      setName('')
      setEditId(null)
      setEditing(false)
      showAlert(true, "Success", "Value Changed")
    } else {
      const newItem = { id: new Date().getTime.toString(), title: name };
      showAlert(true,'success', `${newItem.title} added`)
      setList([...list, newItem]);
      setName("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, msg, type });
  };
  const clearList = () =>{
    showAlert(true, 'danger' , "TODO Cleared" )
    setList([])
  }
  const removeItem = id => {
    showAlert(true,"danger",` Item removed`)
    setList(list.filter((item)=> item.id !== id))
  }
  const editItem = id => {
    const specificItem = list.find((item)=>item.id===id)
    setEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }
  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  })
  return (
    <section className="section-center">
      <div className="grocery-form">
        <form onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h3>Todo</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {editing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
      </div>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
