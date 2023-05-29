import React, { useEffect, useState } from 'react'
import "./style.css"
const Todo = () => {
    const getLocalData=()=>{
     const lists = localStorage.getItem("myTodolist");
     if (lists){
        return JSON.parse(lists);
     } else{
        return [];
     }
    }

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] =useState("");
    const [toggleButton,setToggleButton] =useState(false);
    const addItem = () => {
        if (!inputData) {
            alert("Insert something for adding the data in todo list")
        }
        else if(inputData && toggleButton){
          setItems(items.map((currElem)=>{
            if(currElem.id === isEditItem){
                return {...currElem,name : inputData};
            }
            return currElem;
          }));
          setToggleButton(false);
          setInputData("");
          setIsEditItem(null);
        } 
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items, myNewInputData]);
            setInputData("");

        }
    }
    const editItem=(index)=>{
    const item_todo_edited = items.find((currElem)=>{
        return currElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
    };

    const deleteItem=(index)=> {
        const updatedItems = items.filter((currElem) => {
            return currElem.id !== index;
        });
        setItems(updatedItems);
    }
    const removeALL=()=>{
        setItems([]);   
    }

    useEffect(()=>{
        localStorage.setItem("myTodolist",JSON.stringify(items));
    },[items]);
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.avif" alt="Todo List" />
                        <figCaption>Add Your List here👇</figCaption>
                    </figure>
                    <div className="addIteams">
                        <input type="text" placeholder='✍Add iteams.....' className='form-control'
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)} />
                        {
                            toggleButton ? (<i className="fa fa-duotone fa-edit" onClick={addItem}></i>):(
                            <i className="fa fa-duotone fa-plus" onClick={addItem}></i>)
                        }
                    </div>
                    <div className="showIems">
                        {items.map((currElem) => {
                            return (<div className="eachItem" key={currElem.id}>
                                <h2
                                >{currElem.name}</h2>
                                <div className="todo-btn">
                                    <i className="far fa-duotone fa-edit" onClick={()=>editItem(currElem.id)}></i>
                                    <i className="far fa-duotone fa-trash-alt" onClick={() => deleteItem(currElem.id)}></i>
                                </div>
                            </div>)
                        })}
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All " onClick={removeALL}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
