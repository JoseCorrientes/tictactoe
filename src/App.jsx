import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Board from './components/Board/Board'

function App() {
 

  return (
    <div
        className='flex flex-row w-auto h-screen bg-cover'
        style={{backgroundImage: "url('../src/assets/14063419_5431981.jpg')"}}
        // style={{backgroundImage: "url('/src/assets/14063419_5431981.jpg')"}}
    >
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Board/>}/>


        </Routes>

    </BrowserRouter>
    </div>
  )
}

export default App
