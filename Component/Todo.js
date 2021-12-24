import React, { useEffect, useState } from "react";


// create a localStorage
const getLocalList = () => {
    const localList = localStorage.getItem('lists');
    if(localList){
        return JSON.parse(localStorage.getItem('lists'));
    }else{
        return []
    }
}

export default function Todo(){

    const [text, setText] = useState(''); //input value will store in text variable
    const [list, setList] = useState(getLocalList()); //this is a list where all item will store


    // addItem function helps to add item in list array
    const addItem = (e) => {
        e.preventDefault();
        if(!text){
            // blank input
        }else{
            setList([...list, text]);
            setText('');
        }
    }


    // removehandler function will delete item by clicking on delete button
    const removeHandler = (id) => {
        const update = list.filter((item, index) => {
            return index !== id;
        })
        setList(update);
    }


    // set items in localStorage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(list))
    }, [list])


    return(
        <>
            <div className="header">
                <h3>Todo App</h3>
                <p>By <a href="https://zisanurhaque.com">Zisanur Haque</a></p>
            </div>

            {/* UI design*/}
            <div className="main">
                {/* Input Design */}
                <form>
                    <input 
                        type="text" 
                        placeholder="type here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button onClick={addItem}>Add</button>
                </form>

                {/* Data Lists */}
                <div className="datas">
                {
                    list.map((item, index) => (
                        <div className="list" key={index}>
                            <span>{index + 1}</span>
                            <p>{item}</p>
                            <button onClick={() => removeHandler(index)}>Delete</button>
                        </div>
                    ))
                }
                </div>
            </div>

            <div className="footer">
                <p>Copyright 2021 | Powered By <a href="https://zisanurhaque.com">Zisanur Haque</a></p>
            </div>
        </>
    )
}