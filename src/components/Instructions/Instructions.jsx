import { useState } from "react"


function Instructions({handleSubmit}) {


    const[humanStarts, setHumanStarts] = useState(false)
    const[rounds, setRounds] = useState("")  

    const handleChangeHumanStarts = (e)=>{
        setHumanStarts(prev=>!humanStarts)
        console.log(e.target.value)
    }

    const handleChangeRounds =(e)=>{
        console.log(e.target.value)
        setRounds(e.target.value)
    }


  return (
    <div
    className="flex flex-row justify-center items-center fixed inset-0 w-screen h-screen bg-black bg-opacity-70 "
>
            <div
                className="flex flex-col  items-center w-auto px-10 h-2/3  border-4 rounded-3xl bg-black bg-opacity-100 shadow-white shadow-lg ">
                
                    <p
                        className="font-fontdinerSwanky text-3xl text-gray-400 mt-10 mb-5 "
                        >
                        Bienvenido a 
                    </p>    
                    <p
                        className="font-fontdinerSwanky text-7xl text-orange-400 "
                        >Tic-Tac-Toe
                    </p>

                
                
                    <div
                        className="px-3 mt-20 w-full flex flex-col justify-start items-center"
                    >
                            
                            <div
                                className="w-full h-auto flex flex-row justify-center items-center  "
                            >
                                <p
                                    className="w-5/6 text-white flex flex-row justify-start items-center font-fontdinerSwanky text-3xl"
                                    >Empieza el Jugador...
                                </p> 
                                <div
                                    className="w-1/6 flex flex-row justify-center items-center "
                                >
                                    <input
                                        onClick={handleChangeHumanStarts}
                                        name="humanStarts"
                                        value={humanStarts}
                                        className="w-[30px] h-[30px] "
                                        type="checkbox"
                                    />
                                </div>
                            </div> 




                            <div
                                className="w-full h-auto flex flex-row justify-center items-center  "
                            >
                                <p
                                    className="mt-5 w-5/6 text-white flex flex-row justify-start items-center font-fontdinerSwanky text-3xl"
                                    >No. de Rondas...
                                </p>    
                                <div
                                        className="w-1/6 flex flex-row justify-center items-center font-arial text-lg"
                                        >
                                        <input
                                                    onChange={(e)=>handleChangeRounds(e)}
                                                    className="w-[50px] h-[50px] rounded-lg border-blue-500 border-4 text-center"
                                                    type="text"
                                                    value={rounds}
                                                    name="rounds"
                                        />
                                </div>
                            </div>
                            { rounds!="" &&
                            <button
                                    onClick={()=>handleSubmit({rounds, humanStarts })}
                                    className="mt-5 text-white font-fontdinerSwanky text-3xl border-2 w-1/2 h-20 rounded-lg shadow-white shadow-lg hover:shadow-none hover:scale-95 hover:bg-gray-600"
                            >
                                Jugar
                            </button>
                            } 


                    </div>
                
            </div>   

</div>


  )
}

export default Instructions