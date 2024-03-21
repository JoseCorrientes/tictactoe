

function WinnerScore({rounds,  playerOnePoints, playerTwoPoints, handleReStart}) {

        return (
          <div
              className="w-1/3 h-auto border-4 rounded-3xl border-white bg-black shadow-white shadow-lg flex flex-col justify-center items-center"
          >
                    <div
                        className="mt-4 flex flex-row justify-center items-center"
                    >
                            <h1
                                className="font-fontdinerSwanky text-5xl text-gray-400 mr-4 "
                            >Ronda:</h1> 
                            <h1
                                className="font-fontdinerSwanky text-4xl text-red-700"
                            >{rounds}</h1> 
                    </div>      
      


                    { playerOnePoints>playerTwoPoints &&
                    <div
                        className="mt-4 flex flex-row justify-center items-center"
                    >
                            <p
                                className="font-fontdinerSwanky text-3xl text-red-700 mb-2"
                            > ¡ Usted Ganó {playerOnePoints} a {playerTwoPoints} !
                            </p>
                            
            
                    </div>   
                    } 



                    {playerOnePoints<playerTwoPoints &&
                    <div
                        className="mt-4 flex flex-row justify-center items-center mb-2"
                    >
            
                        <p
                                className="font-fontdinerSwanky text-3xl text-red-700"
                            > ¡ La CPU Ganó {playerTwoPoints} a {playerOnePoints} !
                            </p>
                            
                    </div>
                    }


                    {playerOnePoints==playerTwoPoints &&
                    <div
                        className="mt-4 flex flex-row justify-center items-center mb-2"
                    >
            
                        <p
                                className="font-fontdinerSwanky text-3xl text-red-700"
                            > ¡ Empataron en {playerTwoPoints} !
                            </p>
                            
                    </div>
                    }

                    <button
                            onClick={handleReStart}
                            className=" text-white font-fontdinerSwanky text-2xl border-2 w-1/2 h-14 rounded-lg shadow-white shadow-lg hover:shadow-none mt-6 hover:scale-95 hover:bg-gray-600 mb-6"
                            >
                                Jugar
                    </button>



      
          </div>
        )
      }

export default WinnerScore