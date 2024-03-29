import { useEffect, useState } from "react"
import { AiTwotoneMeh, AiOutlineClose } from "react-icons/ai";   
import { play } from "../../tools/play";
import Modal from "../Modal/Modal";
// import Messages from "../Messages/Messages";
import Instructions from "../Instructions/Instructions";
import Score from "../Score/Score";
import WinnerScore from "../WinnerScore/WinnerScore";
import { messages } from "../../tools/messages";


function Board() {

    const [playerOne, setPlayerOne] = useState([]); //arreglo de las casilla que ocupa el player one (humano)
    const [playerTwo, setPlayerTwo] = useState([]);//arreglo de las casillas que ocupa el player two CPU
    const [whoWins, setWhoWins] = useState("");  //Indica quien gana la partida 1- 2- ,3-empate
    const [playerOneWinPos, setPlayerOneWinPos] = useState([])
    const [playerTwoWinPos, setPlayerTwoWinPos] = useState([])
    const [seeStart, setSeeStart] = useState(false)   //para ver el menu del principio
    const [rounds, setRounds] = useState(100)   //numero de rondas a los que se juega.
    const [currentRound, setCurrentRound] = useState(1); //Ronda que se esta jugando
    const [playerOnePoints, setPlayerOnePoints] = useState(0);   //cantidad de triunfos del jugador
    const [playerTwoPoints, setPlayerTwoPoints]= useState(0);    //cantidad de triunfos del CPU 
    const [turn, setTurn] = useState(1);  //A quien le toca jugar jugador 1 (humano) o jugador 2 (pc)
    const [moves, setMoves] = useState([]); //aca guarda cada jugada en orden    
    const [seeWinner, setSeeWinner] = useState(false);  //muestra el mensaje de ganador despues de toda una ronda
    const [tiePoints, setTiePoints] = useState(0); //cantidad de empates
    const [startGameAgain, setStartGameAgain] = useState(false);
    const [whoStartInstruction, setWhoStartInstruction] = useState()
    const [language, setLanguage] = useState(0);  //Setea el lenguaje 0-Español, 1-Ingles


    const winners = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ]

    const handleClick =(pos)=>{
            //player One Jugador Humano
            let arrayCopy = [...playerOne]
            arrayCopy.push(pos);
            setPlayerOne(arrayCopy);
            let movesArrayCopy = [...moves]
            movesArrayCopy.push([1,pos])
            setMoves(movesArrayCopy)
            setTurn(2)
    }  

    const handleChangeLanguage =(e)=>{
        console.log('clicqueo')
        console.log(e.target.value)
        if (e.target.value==0) setLanguage(1)
        else setLanguage(0);
    }

    const handleReStart = ()=>{
        setSeeWinner(false);
        setPlayerOnePoints(0);
        setPlayerTwoPoints(0);
        setTiePoints(0);
        setPlayerOne([]);
        setPlayerTwo([]);
        setWhoWins("");
        setPlayerOneWinPos([]);
        setPlayerTwoWinPos([]);
        setTurn(1);
        setMoves([]);
        setSeeStart(true)
        setRounds(99);
        setCurrentRound(1);

    }



    const handleSubmit = (data)=>{
        if(data.humanStarts)  setWhoStartInstruction(1)
        else setWhoStartInstruction(2)
        if(data.humanStarts)  setTurn(1)
        else setTurn(2)
        let newRounds = parseInt(data.rounds)
        setRounds(newRounds)
        setSeeStart(false)
    }
    
    useEffect(()=>{
        setSeeStart(true);
    },[])

    useEffect(()=>{
        if(turn==2 && moves.length<9 ) {
            let newMove = play(playerOne, playerTwo, winners)
            let arrayCopy = [...playerTwo]
            arrayCopy.push(newMove);
            let oldMoves = [...moves];
            oldMoves.push([2,newMove])
            setMoves(oldMoves)
            setPlayerTwo(arrayCopy)
            setTurn(1)
        }    
    },[])

    useEffect(()=>{
        if(turn==2 && moves.length<9 ) {
            let newMove = play(playerOne, playerTwo, winners)
            let arrayCopy = [...playerTwo]
            arrayCopy.push(newMove);
            let oldMoves = [...moves];
            oldMoves.push([2,newMove])
            setMoves(oldMoves)
            setPlayerTwo(arrayCopy)
            setTurn(1)
        }    
    },[startGameAgain, turn])

    const handleOkFinishMatch = ()=>{
        if (currentRound<=rounds && whoWins!="") {
                        setWhoWins("")
                        setPlayerOne([])
                        setPlayerTwo([])
                        setPlayerOneWinPos([])
                        setPlayerTwoWinPos([])
                        setMoves([])
                        setTurn(whoStartInstruction);
        }
        if (currentRound!=rounds) {
            let newCurrentRound= currentRound+1;
            setCurrentRound(newCurrentRound);
        }

        if (playerOnePoints+playerTwoPoints+tiePoints==rounds) {
                    setSeeWinner(true);
        }   
    }    

    useEffect(()=>{
        let posOne=0; 
        let foundedOne=false;
        let arrayToCompareOne;
        while(posOne<winners.length && !foundedOne) {
            arrayToCompareOne = winners[posOne];
            let containsAllOne=true;
            for(let x=0; x<arrayToCompareOne.length; x++){
                if (!playerOne.includes(arrayToCompareOne[x])) containsAllOne=false;
            }
            if (containsAllOne) {
                foundedOne=true;
                setPlayerOneWinPos(arrayToCompareOne)
            } else {
                posOne++;
            }
        }
        if (foundedOne) {
                    let result = playerOnePoints+1;
                    setPlayerOnePoints(result)
                    setWhoWins(1)   //anulo mientras porque quiero reveer la jugada
        }
    }, [playerOne])


    useEffect(()=>{
        let posTwo=0; 
        let foundedTwo=false;
        let arrayToCompareTwo;
        while(posTwo<winners.length && !foundedTwo) {
            arrayToCompareTwo = winners[posTwo];
            let containsAllTwo=true;
            for(let x=0; x<arrayToCompareTwo.length; x++){
                if (!playerTwo.includes(arrayToCompareTwo[x])) containsAllTwo=false;
            }
            if (containsAllTwo) {
                foundedTwo=true;
                setPlayerTwoWinPos(arrayToCompareTwo)
            } else {
                posTwo++;
            }
        }
        if (foundedTwo) { 
                setWhoWins(2)           
                let result = playerTwoPoints+1;
                setPlayerTwoPoints(result)
                setPlayerTwoWinPos(arrayToCompareTwo);
        }    
    },[playerTwo])


    useEffect(()=>{
        if (playerOne.length + playerTwo.length ==9)  {
                let result = tiePoints+1;
                setTiePoints(result)
                setWhoWins(3)
        }
    },[playerOne,playerTwo])


  return (
    <div
        className='flex flex-col justify-center items-center w-screen h-screen bg-black bg-opacity-60 '
        >



        <div
            className="flex flex-row justify-center items-center h-1/4 w-full  mb-4 "
        >

                    {whoWins==1 &&
                    <div
                    className="flex flex-row justify-center items-center w-full mx-1 sm:w-1/3 px-5 h-auto sm:h-1/2  border-4 rounded-3xl shadow-white shadow-lg bg-black"
                        >
                            <p
                            className="flex flex-row items-center justify-center w-5/6 h-[70px] bg-opacity-100  font-fontdinerSwanky text-lg sm:text-3xl text-gray-400 r"
                            >
                            {messages.playerWin2[language]}   
                            </p>
                            <button
                                onClick={ handleOkFinishMatch}
                                className="text-white font-fontdinerSwanky text-lg sm:text-2xl border-4 w-1/4 sm:w-1/6 h-[56px] rounded-lg shadow-white shadow-lg hover:shadow-none hover:scale-95 hover:bg-gray-600"
                            >
                                Ok
                            </button>
                    </div> 
                    }  




                    {whoWins==2 &&
                    <div
                        className="flex flex-row justify-center items-center w-full mx-1 sm:w-1/3 px-5 h-auto sm:h-1/2  border-4 rounded-3xl shadow-white shadow-lg bg-black "
                        >
                            <p
                            className="flex flex-row items-center justify-center w-5/6 h-[70px] bg-opacity-100  font-fontdinerSwanky text-lg sm:text-3xl text-gray-400 r"
                            >
                            {messages.cpuWin2[language]}   
                            </p>
                            <button
                                onClick={ handleOkFinishMatch}
                                className="text-white font-fontdinerSwanky text-lg sm:text-2xl border-4 w-1/4 sm:w-1/6 h-[56px] rounded-lg shadow-white shadow-lg hover:shadow-none hover:scale-95 hover:bg-gray-600"
                            >
                                Ok
                            </button>
                    </div> 
                    }  




                    {whoWins==3 &&
                    <div
                    className="flex flex-row justify-center items-center w-full mx-1 sm:w-1/3 px-5 h-auto sm:h-1/2  border-4 rounded-3xl shadow-white shadow-lg bg-black"
                        >
                            <p
                           className="flex flex-row items-center justify-center w-5/6 h-[70px] bg-opacity-100  font-fontdinerSwanky text-lg sm:text-3xl text-gray-400 r"
                            >
                            {messages.tieWin2[language]}   
                            </p>
                            <button
                                onClick={ handleOkFinishMatch}
                                className="text-white font-fontdinerSwanky text-lg sm:text-2xl border-4 w-1/4 sm:w-1/6 h-[56px] rounded-lg shadow-white shadow-lg hover:shadow-none hover:scale-95 hover:bg-gray-600"
                            >
                                Ok
                            </button>
                    </div> 
                    }  










                    {!seeWinner && !seeStart && whoWins!=1 && whoWins!=2 && whoWins!=3 &&
                    <Score
                        rounds={rounds}
                        currentRound={currentRound}
                        playerOnePoints={playerOnePoints}
                        playerTwoPoints={playerTwoPoints}
                        languaje={language}
                        messages={messages}
                    
                    />
                    }
                    {seeWinner &&
                    <WinnerScore
                        rounds={rounds}
                        playerOnePoints={playerOnePoints}
                        playerTwoPoints={playerTwoPoints}
                        handleReStart={handleReStart}
                        messages={messages}
                        languaje={language}
                    
                    />
                    }
        </div>
















        {!seeWinner &&  !seeStart &&      
        <div
            className="mt-4 sm:mt-0 h-3/4 sm:h-3/4 w-[300px] sm:w-auto"
            // className="mt-4 sm:mt-0 h-[300px] sm:h-2/4 w-[300px] sm:w-auto"
        >
                    <div
                        className=' w-full [h-300px] sm:w-auto flex flex-row justify-center items-center '
                        // className=' w-full sm:w-auto flex flex-row justify-center items-center '
                    >





                        {/* Cuando esta vacio y juega player one (humano) */}
                        { !playerOne.includes(1) && !playerTwo.includes(1) && turn==1 && whoWins!=2 &&
                        <div
                            onClick={()=>handleClick(1)}
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }

                        { !playerOne.includes(1) && !playerTwo.includes(1) && turn==1 && whoWins==2 &&
                        <div
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent'
                        >
                        </div>
                        }
                        


                        {/* Cuando esta vacio y juega player two cpu */}
                        { !playerOne.includes(1) && !playerTwo.includes(1) && turn==2 &&
                        <div
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent '
                        >
                        </div>
                        }





                        {/* Cuando esta ocupado por player one Humano pero no es ganadora */}
                        { playerOne.includes(1) &&  !playerOneWinPos.includes(1) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent drop-shadow-3xl'
                        ><AiOutlineClose
                            className="h-full w-full  text-yellow-600"
                            
                        />
                        </p>
                        }
                        {/* Cuando esta ocupado por player one Humano pero ES ganadora */}
                        { playerOne.includes(1) && playerOneWinPos.includes(1) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent drop-shadow-3xl'
                        ><AiOutlineClose
                            className="h-full w-full  text-white bg-green-600"
                            
                        />
                        </p>
                        }









                        {/* Cuando esta ocupado por player two CPU pero no jugada ganadora */}
                        { playerTwo.includes(1) && !playerTwoWinPos.includes(1) &&
                            <p
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent '
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }
                         { playerTwo.includes(1) && playerTwoWinPos.includes(1) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent '
                        ><AiTwotoneMeh
                            className="h-full w-full  text-white bg-red-600"
                            
                        />
                        </p>
                        }




































                        { !playerOne.includes(2) && !playerTwo.includes(2) && turn==1 && whoWins!=2 && 
                        <div
                            onClick={()=>handleClick(2)}
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }

                        { !playerOne.includes(2) && !playerTwo.includes(2) && turn==1 && whoWins==2 &&
                            <div
                                className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-orange-500 '
                            >
                            </div>
                        }                            




                        { !playerOne.includes(2) && !playerTwo.includes(2) && turn==2 &&
                        <div
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 '
                        >
                        </div>
                        }


                        { playerOne.includes(2) && !playerOneWinPos.includes(2) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 '
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                        { playerOne.includes(2) && playerOneWinPos.includes(2) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 '
                        ><AiOutlineClose
                            className="h-full w-full text-white bg-green-600"
                        />
                        </p>
                        }
                        { playerTwo.includes(2) && !playerTwoWinPos.includes(2) &&
                            <p
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 '
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }
                        { playerTwo.includes(2) && playerTwoWinPos.includes(2) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-orange-500'
                        ><AiTwotoneMeh
                            className="h-full w-full  text-white bg-red-600"
                            
                        />
                        </p>
                        }









                        { !playerOne.includes(3) && !playerTwo.includes(3) && turn==1 && whoWins!=2 &&
                        <div
                            onClick={()=>handleClick(3)}
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                        { !playerOne.includes(3) && !playerTwo.includes(3) && turn==1 && whoWins==2 &&
                            <div
                                className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-r-transparent border-b-orange-500 border-t-transparent border-l-orange-500 '
                            >
                            </div>
                        } 


                        { !playerOne.includes(3) && !playerTwo.includes(3) && turn==2 &&
                        <div
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent '
                        >
                        </div>
                        }
                        { playerOne.includes(3) && !playerOneWinPos.includes(3) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                            
                        />
                        </p>
                        }
                         { playerOne.includes(3) && playerOneWinPos.includes(3) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-transparent border-b-orange-500 '
                        ><AiOutlineClose
                            className="h-full w-full text-white bg-green-600"
                        />
                        </p>
                        }


                        { playerTwo.includes(3) && !playerTwoWinPos.includes(3) &&
                            <p
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent '
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }
                         { playerTwo.includes(3) && playerTwoWinPos.includes(3) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent '
                        ><AiTwotoneMeh
                            className="h-full w-full  text-white bg-red-600"
                            
                        />
                        </p>
                        }



                    </div>










                    <div
                        className='flex flex-row justify-center items-center'
                    >
                        { !playerOne.includes(4) && !playerTwo.includes(4) && turn==1 && whoWins!=2 &&
                        <div
                            onClick={()=>handleClick(4)}
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                        { !playerOne.includes(4) && !playerTwo.includes(4) && turn==1 && whoWins==2 &&
                            <div
                                className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-orange-500 border-l-transparent '
                            >
                            </div>
                        } 


                        { !playerOne.includes(4) && !playerTwo.includes(4) && turn==2 &&
                        <div
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500 '
                        >
                        </div>
                        }
                        { playerOne.includes(4) && !playerOneWinPos.includes(4) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                            
                        />
                        </p>
                        }
                        { playerOne.includes(4) && playerOneWinPos.includes(4) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-transparent border-t-orange-500 border-r-orange-500 border-b-orange-500 '
                        ><AiOutlineClose
                            className="h-full w-full text-white bg-green-600"
                        />
                        </p>
                        }



                        { playerTwo.includes(4) && !playerTwoWinPos.includes(4) &&
                            <p
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500'
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }
                        { playerTwo.includes(4) && playerTwoWinPos.includes(4) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500 '
                        ><AiTwotoneMeh
                            className="h-full w-full  text-white bg-red-600"
                            
                        />
                        </p>
                        }








                        { !playerOne.includes(5) && !playerTwo.includes(5) && turn==1 && whoWins!=2 &&
                        <div
                            onClick={()=>handleClick(5)}
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                         { !playerOne.includes(5) && !playerTwo.includes(5) && turn==1 && whoWins==2 &&
                            <div
                                className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-orange-500 '
                            >
                            </div>
                        } 


                        { !playerOne.includes(5) && !playerTwo.includes(5) && turn==2 &&
                        <div
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-orange-500'
                        >
                        </div>
                        }
                        { playerOne.includes(5) && !playerOneWinPos.includes(5) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-orange-500'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                        { playerOne.includes(5) && playerOneWinPos.includes(5) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-t-orange-500 border-r-orange-500 border-b-orange-500 '
                        ><AiOutlineClose
                            className="h-full w-full text-white bg-green-600"
                        />
                        </p>
                        }



                        { playerTwo.includes(5) && !playerTwoWinPos.includes(5) &&
                            <p
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-orange-500'
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }
                         { playerTwo.includes(5) && playerTwoWinPos.includes(5) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4   border-orange-500 '
                        ><AiTwotoneMeh
                            className="h-full w-full  text-white bg-red-600"
                            
                        />
                        </p>
                        }






                    { !playerOne.includes(6) && !playerTwo.includes(6) && turn==1 && whoWins!=2 &&
                        <div
                            onClick={()=>handleClick(6)}
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }

                        { !playerOne.includes(6) && !playerTwo.includes(6) && turn==1 && whoWins==2 &&
                            <div
                                className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent'
                            >
                            </div>
                        }     


                    { !playerOne.includes(6) && !playerTwo.includes(6) && turn==2 &&
                        <div
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent '
                        >
                        </div>
                        }
                        { playerOne.includes(6) && !playerOneWinPos.includes(6) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                        { playerOne.includes(6) && playerOneWinPos.includes(6) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-t-orange-500 border-r-transparent border-b-orange-500 '
                        ><AiOutlineClose
                            className="h-full w-full text-white bg-green-600"
                        />
                        </p>
                        }




                        { playerTwo.includes(6) && !playerTwoWinPos.includes(6) &&
                            <p
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent'
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }
                        { playerTwo.includes(6) && playerTwoWinPos.includes(6) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent '
                        ><AiTwotoneMeh
                            className="h-full w-full  text-white bg-red-600"
                            
                        />
                        </p>
                        }



                    </div>

                    <div
                        className='flex flex-row justify-center items-center'
                    >
                        { !playerOne.includes(7) && !playerTwo.includes(7) && turn==1 && whoWins!=2 &&
                        <div
                            onClick={()=>handleClick(7)}
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                         { !playerOne.includes(7) && !playerTwo.includes(7) && turn==1 && whoWins==2 &&
                            <div
                                className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500'
                            >
                            </div>
                        }  



                        { !playerOne.includes(7) && !playerTwo.includes(7) && turn==2 &&
                        <div
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 '
                        >
                        </div>
                        }
                        { playerOne.includes(7) && !playerOneWinPos.includes(7) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 '
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                         { playerOne.includes(7) && playerOneWinPos.includes(7) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-transparent border-t-orange-500 border-r-orange-500 border-b-transparent '
                        ><AiOutlineClose
                            className="h-full w-full text-white bg-green-600"
                        />
                        </p>
                        }


                        { playerTwo.includes(7) && !playerTwoWinPos.includes(7) &&
                            <p
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 '
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }
                        { playerTwo.includes(7) && playerTwoWinPos.includes(7) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 '
                        ><AiTwotoneMeh
                            className="h-full w-full  text-white bg-red-600"
                            
                        />
                        </p>
                        }





                        { !playerOne.includes(8) && !playerTwo.includes(8) && turn==1 && whoWins!=2 &&
                        <div
                            onClick={()=>handleClick(8)}
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                        { !playerOne.includes(8) && !playerTwo.includes(8) && turn==1 && whoWins==2 &&
                            <div
                                className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500'
                            >
                            </div>
                        } 


                        { !playerOne.includes(8) && !playerTwo.includes(8) && turn==2 &&
                        <div
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500 '
                        >
                        </div>
                        }
                        { playerOne.includes(8) && !playerOneWinPos.includes(8) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                        { playerOne.includes(8) && playerOneWinPos.includes(8) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-t-orange-500 border-r-orange-500 border-b-transparent '
                        ><AiOutlineClose
                            className="h-full w-full text-white bg-green-600"
                        />
                        </p>
                        }


                        { playerTwo.includes(8) && !playerTwoWinPos.includes(8) &&
                            <p
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500'
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }
                        { playerTwo.includes(8) && playerTwoWinPos.includes(8) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4   border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500'
                        ><AiTwotoneMeh
                            className="h-full w-full  text-white bg-red-600"
                            
                        />
                        </p>
                        }








                        { !playerOne.includes(9) && !playerTwo.includes(9) && turn==1 && whoWins!=2 &&
                        <div
                            onClick={()=>handleClick(9)}
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                         { !playerOne.includes(9) && !playerTwo.includes(9) && turn==1 && whoWins==2 &&
                            <div
                                className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent'
                            >
                            </div>
                        } 


                        { !playerOne.includes(9) && !playerTwo.includes(9) && turn==2 &&
                        <div
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent  '
                        >
                        </div>
                        }
                        { playerOne.includes(9) && !playerOneWinPos.includes(9) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                        { playerOne.includes(9) && playerOneWinPos.includes(9) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4  border-l-orange-500 border-t-orange-500 border-r-transparent border-b-transparent '
                        ><AiOutlineClose
                            className="h-full w-full text-white bg-green-600"
                        />
                        </p>
                        }



                        { playerTwo.includes(9) && !playerTwoWinPos.includes(9) &&
                            <p
                            className='w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent'
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }
                        { playerTwo.includes(9) && playerTwoWinPos.includes(9) &&
                            <p
                            className='flex flex-row justify-center items-center w-1/3 h-[100px] sm:w-[150px] sm:h-[150px] border-4   border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent'
                        ><AiTwotoneMeh
                            className="h-full w-full  text-white bg-red-600"
                            
                        />
                        </p>
                        }


                    </div>
    </div>            

    }                


    {seeStart && 
                        <Modal>
                            <Instructions
                                handleSubmit={handleSubmit}
                                language={language}
                                messages={messages}
                                handleChangeLanguage={handleChangeLanguage}
                            />
                        </Modal>
    }    




    </div>
  )
}

export default Board


























