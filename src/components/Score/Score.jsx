
function Score({rounds, currentRound, playerOnePoints, playerTwoPoints, languaje, messages}) {
  return (
    <div
        className="w-full mx-2 mt-6 sm:mx-0 sm:mt-0 sm:w-1/3 h-auto border-4 rounded-3xl border-white bg-black shadow-white shadow-lg"
    >
        <div
            className="mt-0 sm:mt-4 flex flex-row justify-center items-center"
        >
                <h1
                    className="font-fontdinerSwanky text-3xl sm:text-4xl text-gray-400 mr-4 mt-2 sm:mt-0"
                >{messages.round[languaje]}</h1> 
                <h1
                    className="font-fontdinerSwanky text-2xl sm:text-3xl text-red-700"
                >{ (currentRound<=rounds)? currentRound: rounds}/{rounds}</h1> 
        </div>      

        <div
            className="mt-0 sm:mt-2 flex flex-row justify-center items-center"
        >
                <p
                    className="font-fontdinerSwanky text-lg sm:text-2xl text-gray-300 mr-4"
                >{messages.player[languaje]}</p>
                <p
                    className="font-fontdinerSwanky text-2xl text-red-700"
                >{playerOnePoints}</p>

        </div>   

        <div
            className="mt-0 sm:mt-2 flex flex-row justify-center items-center mb-4"
        >

                <p
                    className="font-fontdinerSwanky text-lg sm:text-2xl text-gray-300 mr-4"
                >{messages.cpu[languaje]}</p>
                <p
                    className="font-fontdinerSwanky text-2xl text-red-700"
                >{playerTwoPoints}</p>
        </div>

    </div>
  )
}

export default Score