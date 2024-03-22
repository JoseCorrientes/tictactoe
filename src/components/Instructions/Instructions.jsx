import { useEffect, useState } from "react"
import Spanish from "../../assets/spanish150150.png";
import English from "../../assets/english150150.png";



function Instructions({handleSubmit, language, messages, handleChangeLanguage}) {


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
    className="flex flex-row justify-center items-center fixed inset-0 w-screen h-screen bg-black bg-opacity-70  "
>
            <div
                className="flex flex-col  items-center w-full sm:w-auto px-0 sm:px-10  h-auto m-1 sm:m-0 sm:h-auto  border-4 rounded-3xl bg-black bg-opacity-100 shadow-white shadow-lg  ">
                
                    <p
                        className="font-fontdinerSwanky text-2xl sm:text-3xl text-gray-400 sm:mt-10 sm:mb-5 mt-5"
                        >
                        {messages.welcome[language]}
                    </p>    
                    <p
                        className="font-fontdinerSwanky text-3xl sm:text-7xl text-orange-400 "
                        >{messages.mainTitle[language]}
                    </p>

                
                
                    <div
                        className="px-0 sm:px-3 mt-20 w-full flex flex-col justify-start items-center"
                    >
                            
                            <div
                                className="w-full h-auto flex flex-row justify-center items-center px-3 sm:px-0"
                            >
                                <p
                                    className="w-5/6 text-white flex flex-row justify-start items-center font-fontdinerSwanky text-xl sm:text-3xl"
                                    >{messages.playerStarts[language]}
                                </p> 
                                <div
                                    className="w-1/6 flex flex-row justify-center items-center "
                                >
                                    <input
                                        onClick={handleChangeHumanStarts}
                                        name="humanStarts"
                                        value={humanStarts}
                                        className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] "
                                        type="checkbox"
                                    />
                                </div>
                            </div> 




                            <div
                                className="w-full h-auto flex flex-row justify-center items-center px-3 sm:px-0 "
                            >
                                <p
                                    className="mt-5 w-5/6 text-white flex flex-row justify-start items-center font-fontdinerSwanky text-xl sm:text-3xl"
                                    >{messages.roundsNumber[language]}
                                </p>    
                                <div
                                        className="w-1/6 flex flex-row justify-center items-center font-arial text-lg"
                                        >
                                        <input
                                                    onChange={(e)=>handleChangeRounds(e)}
                                                    className="w-[60px] h-[30px] sm:w-[50px] sm:h-[50px] rounded-lg border-blue-500 border-4 text-center"
                                                    type="text"
                                                    value={rounds}
                                                    name="rounds"
                                        />
                                </div>
                            </div>







                            <div
                                className="w-full flex flex-row justify-center items-center"
                            >
                                { rounds!="" &&
                                <button
                                        onClick={()=>handleSubmit({rounds, humanStarts })}
                                        className="mt-10 text-white font-fontdinerSwanky text-xl sm:text-3xl border-2 w-1/3 sm:w-1/2 h-10 sm:h-20 rounded-lg shadow-white shadow-lg hover:shadow-none hover:scale-95 hover:bg-gray-600 mb-10 sm:mb-10"
                                >
                                    {messages.playButton[language]}
                                </button>
                                } 
                                { rounds=="" &&
                                <button
                                        disabled
                                        className="mt-10 text-gray-900 font-fontdinerSwanky text-xl sm:text-3xl border-2 border-gray-900 w-1/3 sm:w-1/2 h-10 sm:h-20 rounded-lg shadow-gray-900 shadow-lg mb-10 sm:mb-10"
                                >
                                    {messages.playButton[language]}
                                </button>
                                } 
                                <button
                                    onClick={(e)=>handleChangeLanguage(e)}
                                    value={language} 
                                    className="ml-10 w-[30px] h-[30px] sm:w-[60px] sm:h-[60px] cursor-pointer"
                                    style={{backgroundImage: `url( ${(language==1)? Spanish: English}) `, backgroundSize: "contain"  }}
                                >

                                </button>
                            </div>







                    </div>
                
            </div>   

</div>


  )
}

export default Instructions