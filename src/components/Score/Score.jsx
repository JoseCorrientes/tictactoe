
function Score({rounds, currentRound, playerOnePoints, playerTwoPoints}) {
  return (
    <div
        className="w-1/3 h-auto border-4 rounded-3xl border-white bg-black shadow-white shadow-lg"
        // className="w-1/3 h-auto fixed top-2 border-4 rounded-3xl border-white bg-black shadow-white shadow-lg"
    >
        <div
            className="mt-4 flex flex-row justify-center items-center"
        >
                <h1
                    className="font-fontdinerSwanky text-4xl text-gray-400 mr-4"
                >Ronda:</h1> 
                <h1
                    className="font-fontdinerSwanky text-3xl text-red-700"
                >{ (currentRound<=rounds)? currentRound: rounds}/{rounds}</h1> 
        </div>      

        <div
            className="mt-2 flex flex-row justify-center items-center"
        >
                <p
                    className="font-fontdinerSwanky text-2xl text-gray-300 mr-4"
                >Jugador:</p>
                <p
                    className="font-fontdinerSwanky text-2xl text-red-700"
                >{playerOnePoints}</p>

        </div>   

        <div
            className="mt-2 flex flex-row justify-center items-center mb-4"
        >

                <p
                    className="font-fontdinerSwanky text-2xl text-gray-300 mr-4"
                >CPU:</p>
                <p
                    className="font-fontdinerSwanky text-2xl text-red-700"
                >{playerTwoPoints}</p>
        </div>

    </div>
  )
}

export default Score