import {useState, useEffect} from 'react';
import {getDoc, doc, onSnapshot} from 'firebase/firestore';
import db from './firebase.config';
import "./App.css"

let BASE_URL = 'http://localhost:5000/api/'

function App() {
    const [clickCount, setClickCount] = useState("")
    const [incrementBtnDisabled, setIncrementBtnDisabled] = useState(false)
    const updateClickCounter = async() => {
        const clickDocRef = doc(db, "click", "CHECKID");
        const clickDocSnap = await getDoc(clickDocRef);

        if(clickDocSnap.exists()) {
            const data = clickDocSnap.data()
            setClickCount(data)
            return data
        } else {
            return "Не удалось получить данные!"
        }

    }
    useEffect(() => {
        setClickCount("Загрузка...")
        updateClickCounter().then((data) => {
            setClickCount(data)
        }).catch(() => {
            alert("Произошла ошибка!")
        })
    }, [])

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "click", "CHECKID"), (doc) => {
            updateClickCounter().then((data) => {
                setClickCount(data)
            })
        });
        return () => {
            unsubscribe()
        }
    }, [])

    const increment = async() => {
        setIncrementBtnDisabled(true)
        try {
            const response = await fetch(BASE_URL + 'new_click', {method: "POST"})
            if(!response.ok) {
                alert("Ошибка HTTP: " + response.status);
            }
        } catch(e) {
            setClickCount("Произошла ошибка!")
        } finally {
            setIncrementBtnDisabled(false)
        }
    }

    const dataForDisplay = typeof clickCount === "string" ? clickCount : clickCount?.count

    return (
        <div className="App">
            <div className={"buttons"}>
                <button disabled={incrementBtnDisabled} style={{backgroundColor: incrementBtnDisabled && "grey"}} onClick={increment}>increment</button>
            </div>
            <h1>{dataForDisplay}</h1>
        </div>
    );
}

export default App;
