import { useEffect, useState } from "react"
import { AiTwotoneMeh, AiOutlineClose } from "react-icons/ai";   
import { play } from "../../tools/play";
import Modal from "../Modal/Modal";
import Messages from "../Messages/Messages";
import Instructions from "../Instructions/Instructions";
import Score from "../Score/Score";
import WinnerScore from "../WinnerScore/WinnerScore";


function Board() {

    const [playerOne, setPlayerOne] = useState([]); //arreglo de las casilla que ocupa el player one (humano)
    const [playerTwo, setPlayerTwo] = useState([]);//arreglo de las casillas que ocupa el player two CPU
    const [whoWins, setWhoWins] = useState("");  //Indica quien gana la partida 1- 2- ,3-empate

    const [playerOneWinPos, setPlayerOneWinPos] = useState([])
    const [playerTwoWinPos, setPlayerTwoWinPos] = useState([])

    const[seeStart, setSeeStart] = useState(false)   //para ver el menu del principio
    const[rounds, setRounds] = useState(99)   //numero de rondas a los que se juega.
    // const[rounds, setRounds] = useState("")   //numero de rondas a los que se juega.
    const[currentRound, setCurrentRound] = useState(1); //Ronda que se esta jugando

    const[playerOnePoints, setPlayerOnePoints] = useState(0);   //cantidad de triunfos del jugador
    const[playerTwoPoints, setPlayerTwoPoints]= useState(0);    //cantidad de triunfos del CPU 
    


    const [turn, setTurn] = useState(1);  //A quien le toca jugar jugador 1 (humano) o jugador 2 (pc)
    const [moves, setMoves] = useState([]); //aca guarda cada jugada en orden    

    // const[turnIntoRound, seeTurnIntoRound] = useState(1);   //a quien le toca jugar primero en base al menu introductorio 1-player one, 2-cpu

    const[seeWinner, setSeeWinner] = useState(false);  //muestra el mensaje de ganador despues de toda una ronda

    const [tiePoints, setTiePoints] = useState(0); //cantidad de empates


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
            // setTimeout(() => {
            //     setTurn(2)
            // }, 600)
            // let newMoves = [...moves];



            setTurn(2)
    }  


    const handleReStart = ()=>{
        console.log('reestablezco')
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
        console.log('data')
        console.log(data)
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
        if (playerOnePoints+playerTwoPoints+tiePoints==rounds) {
            setSeeWinner(true);
        }   
    },[tiePoints, playerOnePoints, playerTwoPoints]) //Cada vez que se termina una partida 
        



    useEffect(()=>{

        if(turn==2 && moves.length<9 && whoWins!=1) {
            let newMove = play(playerOne, playerTwo, winners)
            let arrayCopy = [...playerTwo]
            arrayCopy.push(newMove);
            let oldMoves = [...moves];
            oldMoves.push([2,newMove])
            setMoves(oldMoves)
            setPlayerTwo(arrayCopy)
            setTurn(1)
        }    
    },[turn])





    useEffect(()=>{
        setTimeout(()=>{
            if (currentRound<=rounds && whoWins!="") {
                setWhoWins("")
                setPlayerOne([])
                setPlayerTwo([])
                setPlayerOneWinPos([])
                setPlayerTwoWinPos([])
                //aca tengo que ver si quiero reveer la jugada completa o no (esta almacenda en moves)
                setMoves([])
            }
            // if (currentRound>rounds) console.log('hacer terminar toda la ronda')
            

        },2000)
        
    },[whoWins])





    useEffect(()=>{
        // Analiza si gano el player One Jugador Humano
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
                    console.log('Player One wins (Humano)')
                    let result = playerOnePoints+1;
                    setPlayerOnePoints(result)

                    if (currentRound!=rounds) {
                        let newCurrentRound= currentRound+1;
                        setCurrentRound(newCurrentRound);
                    }
                        
                    setWhoWins(1)
           
        }
    }, [playerOne])





    useEffect(()=>{
        //Analiza si gano el playerTwo Computadora
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
                console.log('Player Two wins (PC)')
                if (currentRound!=rounds) {
                    let newCurrentRound= currentRound+1;
                    setCurrentRound(newCurrentRound);
                }
                setWhoWins(2)
                let result = playerTwoPoints+1;
                setPlayerTwoPoints(result)
                setPlayerTwoWinPos(arrayToCompareTwo);



            // setTimeout(()=>{
            //     console.log('Player Two wins (PC)')
            //     setWhoWins(2)
            //     setPlayerTwoWinPos(arrayToCompareTwo);
            // },1000)
        }    
    },[playerTwo])






    useEffect(()=>{
        //Analizo si se llenaron todas las casillas
        if (playerOne.length + playerTwo.length ==9)   {
                console.log(`longitud player one ${playerOne.length}`)
                console.log(`longitud player two ${playerTwo.length}`)
                console.log(' Se termino el juego')

                if (currentRound!=rounds) {
                    let newCurrentRound= currentRound+1;
                    setCurrentRound(newCurrentRound);
                }

                let result = tiePoints+1;
                setTiePoints(result)

                setWhoWins(3)



            // setTimeout(()=>{
            //     console.log(' Se termino el juego')
            //     setCurrentRound(oldValue=>oldValue+1)
            //     setWhoWins(3)
            // },1000)
        }
    },[playerOne,playerTwo])






  return (
    <div
        className='flex flex-col justify-center items-center w-screen h-screen bg-black bg-opacity-60'
        >



        <div
            className="flex flex-row justify-center items-center h-1/3 w-full mb-4"
        >
                    {!seeWinner && !seeStart &&
                    <Score
                        rounds={rounds}
                        currentRound={currentRound}
                        playerOnePoints={playerOnePoints}
                        playerTwoPoints={playerTwoPoints}
                    
                    />
                    }
                    {seeWinner &&
                    <WinnerScore
                        rounds={rounds}
                        playerOnePoints={playerOnePoints}
                        playerTwoPoints={playerTwoPoints}
                        handleReStart={handleReStart}
                    
                    />
                    }
        </div>




        <div
            className="h-2/3"
        >
                    <div
                        className='flex flex-row justify-center items-center '
                    >


                        { !playerOne.includes(1) && !playerTwo.includes(1) && turn==1 &&
                        <div
                            onClick={()=>handleClick(1)}
                            className='w-[150px] h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                        { !playerOne.includes(1) && !playerTwo.includes(1) && turn==2 &&
                        <div
                            className='w-[150px] h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent '
                        >
                        </div>
                        }
                        { playerOne.includes(1) &&
                            <p
                            className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent drop-shadow-3xl'
                        ><AiOutlineClose
                            className="h-full w-full  text-yellow-600"
                            
                        />
                        </p>
                        }
                        { playerTwo.includes(1) &&
                            <p
                            className='w-[150px] h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent '
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }






                        { !playerOne.includes(2) && !playerTwo.includes(2) && turn==1 &&
                        <div
                            onClick={()=>handleClick(2)}
                            className='w-[150px] h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                        { !playerOne.includes(2) && !playerTwo.includes(2) && turn==2 &&
                        <div
                            className='w-[150px] h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 '
                        >
                        </div>
                        }
                        { playerOne.includes(2) &&
                            <p
                            className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 '
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                        { playerTwo.includes(2) &&
                            <p
                            className='w-[150px] h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 '
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }









                        { !playerOne.includes(3) && !playerTwo.includes(3) && turn==1 &&
                        <div
                            onClick={()=>handleClick(3)}
                            className='w-[150px] h-[150px] border-4 border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                        { !playerOne.includes(3) && !playerTwo.includes(3) && turn==2 &&
                        <div
                            className='w-[150px] h-[150px] border-4 border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent '
                        >
                        </div>
                        }
                        { playerOne.includes(3) &&
                            <p
                            className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4  border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                            
                        />
                        </p>
                        }
                        { playerTwo.includes(3) &&
                            <p
                            className='w-[150px] h-[150px] border-4  border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent '
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }
                    </div>










                    <div
                        className='flex flex-row justify-center items-center'
                    >
                        { !playerOne.includes(4) && !playerTwo.includes(4) && turn==1 &&
                        <div
                            onClick={()=>handleClick(4)}
                            className='w-[150px] h-[150px] border-4 border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                        { !playerOne.includes(4) && !playerTwo.includes(4) && turn==2 &&
                        <div
                            className='w-[150px] h-[150px] border-4 border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500 '
                        >
                        </div>
                        }
                        { playerOne.includes(4) &&
                            <p
                            className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4 border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                            
                        />
                        </p>
                        }
                        { playerTwo.includes(4) &&
                            <p
                            className='w-[150px] h-[150px] border-4  border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500'
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }







                        { !playerOne.includes(5) && !playerTwo.includes(5) && turn==1 &&
                        <div
                            onClick={()=>handleClick(5)}
                            className='w-[150px] h-[150px] border-4 border-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                        { !playerOne.includes(5) && !playerTwo.includes(5) && turn==2 &&
                        <div
                            className='w-[150px] h-[150px] border-4 border-orange-500'
                        >
                        </div>
                        }
                        { playerOne.includes(5) &&
                            <p
                            className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4 border-orange-500'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                        { playerTwo.includes(5) &&
                            <p
                            className='w-[150px] h-[150px] border-4 border-orange-500'
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }






                    { !playerOne.includes(6) && !playerTwo.includes(6) && turn==1 &&
                        <div
                            onClick={()=>handleClick(6)}
                            className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                    { !playerOne.includes(6) && !playerTwo.includes(6) && turn==2 &&
                        <div
                            className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent '
                        >
                        </div>
                        }
                        { playerOne.includes(6) &&
                            <p
                            className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                        { playerTwo.includes(6) &&
                            <p
                            className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent'
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }



                    </div>

                    <div
                        className='flex flex-row justify-center items-center'
                    >
                        { !playerOne.includes(7) && !playerTwo.includes(7) && turn==1 &&
                        <div
                            onClick={()=>handleClick(7)}
                            className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                        { !playerOne.includes(7) && !playerTwo.includes(7) && turn==2 &&
                        <div
                            className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 '
                        >
                        </div>
                        }
                        { playerOne.includes(7) &&
                            <p
                            className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4  border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 '
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                        { playerTwo.includes(7) &&
                            <p
                            className='w-[150px] h-[150px] border-4  border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 '
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }






                        { !playerOne.includes(8) && !playerTwo.includes(8) && turn==1 &&
                        <div
                            onClick={()=>handleClick(8)}
                            className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                        { !playerOne.includes(8) && !playerTwo.includes(8) && turn==2 &&
                        <div
                            className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500 '
                        >
                        </div>
                        }
                        { playerOne.includes(8) &&
                            <p
                            className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                        { playerTwo.includes(8) &&
                            <p
                            className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500'
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }






                        { !playerOne.includes(9) && !playerTwo.includes(9) && turn==1 &&
                        <div
                            onClick={()=>handleClick(9)}
                            className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
                        >
                        </div>
                        }
                        { !playerOne.includes(9) && !playerTwo.includes(9) && turn==2 &&
                        <div
                            className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent  '
                        >
                        </div>
                        }
                        { playerOne.includes(9) &&
                            <p
                            className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent'
                        ><AiOutlineClose
                            className="h-full w-full text-yellow-600"
                        />
                        </p>
                        }
                        { playerTwo.includes(9) &&
                            <p
                            className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent'
                        ><AiTwotoneMeh
                        className="h-full w-full"
                        />
                        </p>
                        }
                    </div>


                    {whoWins==1 && 
                        <Modal>
                            <Messages
                                id={1}
                            />
                        </Modal>
                    }    
                    {whoWins==2 && 
                        <Modal>
                            <Messages
                                id={2}
                            />
                        </Modal>
                    }    
                    {whoWins==3 && 
                        <Modal>
                            <Messages
                                id={3}
                            />
                        </Modal>
                    }    
                    {seeStart && 
                        <Modal>
                            <Instructions
                                handleSubmit={handleSubmit}
                            />
                        </Modal>
                    }    

    </div>            








    </div>
  )
}

export default Board





























































// import { useEffect, useState } from "react"
// import { AiTwotoneMeh, AiOutlineClose } from "react-icons/ai";   
// import { play } from "../../tools/play";
// import Modal from "../Modal/Modal";
// import Messages from "../Messages/Messages";
// import Instructions from "../Instructions/Instructions";
// import Score from "../Score/Score";


// function Board() {

//     const [playerOne, setPlayerOne] = useState([]);
//     const [playerTwo, setPlayerTwo] = useState([]);
//     const [whoWins, setWhoWins] = useState("");

//     const [playerOneWinPos, setPlayerOneWinPos] = useState([])
//     const [playerTwoWinPos, setPlayerTwoWinPos] = useState([])

//     const[seeStart, setSeeStart] = useState(false)   //para ver el menu del principio
//     const[rounds, setRounds] = useState("")   //numero de rondas a los que se juega.

    


//     const [turn, setTurn] = useState(1);  //A quien le toca jugar jugador 1 (humano) o jugador 2 (pc)
//     const [moves, setMoves] = useState([]); //aca guarda cada jugada en orden    

//     const winners = [
//         [1,2,3],
//         [4,5,6],
//         [7,8,9],
//         [1,4,7],
//         [2,5,8],
//         [3,6,9],
//         [1,5,9],
//         [3,5,7]
//     ]




//     const handleClick =(pos)=>{
//             //player One Jugador Humano
//             let arrayCopy = [...playerOne]
//             arrayCopy.push(pos);
//             setPlayerOne(arrayCopy);
//             let movesArrayCopy = [...moves]
//             movesArrayCopy.push([1,pos])
//             setMoves(movesArrayCopy)
//             setTimeout(() => {
//                 setTurn(2)
//             }, 600)
//     }  


//     const handleSubmit = (data)=>{
//         console.log('data')
//         console.log(data)
//         if(data.humanStarts)  setTurn(1)
//         else setTurn(2)
//         setRounds(data.rounds)
//         setSeeStart(false)
//     }

//     useEffect(()=>{
//         setSeeStart(true);
//     },[])






//     useEffect(()=>{

//         if(turn==2 && moves.length<9 && whoWins!=1) {
//             let newMove = play(playerOne, playerTwo, winners)
//             let arrayCopy = [...playerTwo]
//             arrayCopy.push(newMove);
//             let oldMoves = [...moves];
//             oldMoves.push([2,newMove])
//             setMoves(oldMoves)
//             setPlayerTwo(arrayCopy)
//             setTurn(1)
//         }    
//     },[turn])







//     useEffect(()=>{
//         // Analiza si gano el player One Jugador Humano
//         let posOne=0; 
//         let foundedOne=false;
//         let arrayToCompareOne;
//         while(posOne<winners.length && !foundedOne) {
//             arrayToCompareOne = winners[posOne];
//             let containsAllOne=true;
//             for(let x=0; x<arrayToCompareOne.length; x++){
//                 if (!playerOne.includes(arrayToCompareOne[x])) containsAllOne=false;
//             }
//             if (containsAllOne) {
//                 foundedOne=true;
//                 setPlayerOneWinPos(arrayToCompareOne)

//             } else {
//                 posOne++;
//             }
//         }
//         if (foundedOne) {
//             setTimeout(()=>{
//                     console.log('Player One wins (Humano)')
//                     setWhoWins(1)
//             }, 1000)
//         }
//     }, [playerOne])





//     useEffect(()=>{
//         //Analiza si gano el playerTwo Computadora
//         let posTwo=0; 
//         let foundedTwo=false;
//         let arrayToCompareTwo;
//         while(posTwo<winners.length && !foundedTwo) {
//             arrayToCompareTwo = winners[posTwo];
//             let containsAllTwo=true;
//             for(let x=0; x<arrayToCompareTwo.length; x++){
//                 if (!playerTwo.includes(arrayToCompareTwo[x])) containsAllTwo=false;
//             }
//             if (containsAllTwo) {
//                 foundedTwo=true;
//                 setPlayerTwoWinPos(arrayToCompareTwo)
//             } else {
//                 posTwo++;
//             }
//         }
//         if (foundedTwo) { 
//             setTimeout(()=>{
//                 console.log('Player Two wins (PC)')
//                 setWhoWins(2)
//                 setPlayerTwoWinPos(arrayToCompareTwo);
//             },1000)
//         }    
//     },[playerTwo])






//     useEffect(()=>{
//         //Analizo si se llenaron todas las casillas
//         if (playerOne.length + playerTwo.length ==9)   {
//             setTimeout(()=>{
//                 console.log(' Se termino el juego')
//                 setWhoWins(3)
//             },1000)
//         }
//     },[playerOne,playerTwo])






//   return (
//     <div
//         className='flex flex-col justify-center items-center w-screen h-screen bg-black bg-opacity-60'
//         >


//             <Score/>


//             <div
//                 className='flex flex-row justify-center items-center '
//             >


//                 { !playerOne.includes(1) && !playerTwo.includes(1) && turn==1 &&
//                 <div
//                     onClick={()=>handleClick(1)}
//                     className='w-[150px] h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
//                 >
//                 </div>
//                 }
//                 { !playerOne.includes(1) && !playerTwo.includes(1) && turn==2 &&
//                 <div
//                     className='w-[150px] h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent '
//                 >
//                 </div>
//                 }
//                 { playerOne.includes(1) &&
//                     <p
//                     className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent drop-shadow-3xl'
//                 ><AiOutlineClose
//                     className="h-full w-full  text-yellow-600"
                    
//                 />
//                 </p>
//                 }
//                 { playerTwo.includes(1) &&
//                     <p
//                     className='w-[150px] h-[150px] border-4  border-r-orange-500 border-b-orange-500 border-t-transparent border-l-transparent '
//                 ><AiTwotoneMeh
//                 className="h-full w-full"
//                 />
//                 </p>
//                 }






//                 { !playerOne.includes(2) && !playerTwo.includes(2) && turn==1 &&
//                 <div
//                     onClick={()=>handleClick(2)}
//                     className='w-[150px] h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
//                 >
//                 </div>
//                 }
//                 { !playerOne.includes(2) && !playerTwo.includes(2) && turn==2 &&
//                 <div
//                     className='w-[150px] h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 '
//                 >
//                 </div>
//                 }
//                 { playerOne.includes(2) &&
//                     <p
//                     className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 '
//                 ><AiOutlineClose
//                     className="h-full w-full text-yellow-600"
//                 />
//                 </p>
//                 }
//                 { playerTwo.includes(2) &&
//                     <p
//                     className='w-[150px] h-[150px] border-4  border-l-orange-500 border-t-transparent border-r-orange-500 border-b-orange-500 '
//                 ><AiTwotoneMeh
//                 className="h-full w-full"
//                 />
//                 </p>
//                 }









//                 { !playerOne.includes(3) && !playerTwo.includes(3) && turn==1 &&
//                 <div
//                     onClick={()=>handleClick(3)}
//                     className='w-[150px] h-[150px] border-4 border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
//                 >
//                 </div>
//                 }
//                 { !playerOne.includes(3) && !playerTwo.includes(3) && turn==2 &&
//                 <div
//                     className='w-[150px] h-[150px] border-4 border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent '
//                 >
//                 </div>
//                 }
//                 { playerOne.includes(3) &&
//                     <p
//                     className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4  border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent'
//                 ><AiOutlineClose
//                     className="h-full w-full text-yellow-600"
                    
//                 />
//                 </p>
//                 }
//                 { playerTwo.includes(3) &&
//                     <p
//                     className='w-[150px] h-[150px] border-4  border-l-orange-500 border-b-orange-500 border-t-transparent border-r-transparent '
//                 ><AiTwotoneMeh
//                 className="h-full w-full"
//                 />
//                 </p>
//                 }
//             </div>










//             <div
//                 className='flex flex-row justify-center items-center'
//             >
//                 { !playerOne.includes(4) && !playerTwo.includes(4) && turn==1 &&
//                 <div
//                     onClick={()=>handleClick(4)}
//                     className='w-[150px] h-[150px] border-4 border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
//                 >
//                 </div>
//                 }
//                 { !playerOne.includes(4) && !playerTwo.includes(4) && turn==2 &&
//                 <div
//                     className='w-[150px] h-[150px] border-4 border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500 '
//                 >
//                 </div>
//                 }
//                 { playerOne.includes(4) &&
//                     <p
//                     className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4 border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500'
//                 ><AiOutlineClose
//                     className="h-full w-full text-yellow-600"
                    
//                 />
//                 </p>
//                 }
//                 { playerTwo.includes(4) &&
//                     <p
//                     className='w-[150px] h-[150px] border-4  border-l-transparent border-b-orange-500 border-t-orange-500 border-r-orange-500'
//                 ><AiTwotoneMeh
//                 className="h-full w-full"
//                 />
//                 </p>
//                 }







//                 { !playerOne.includes(5) && !playerTwo.includes(5) && turn==1 &&
//                 <div
//                     onClick={()=>handleClick(5)}
//                     className='w-[150px] h-[150px] border-4 border-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
//                 >
//                 </div>
//                 }
//                 { !playerOne.includes(5) && !playerTwo.includes(5) && turn==2 &&
//                 <div
//                     className='w-[150px] h-[150px] border-4 border-orange-500'
//                 >
//                 </div>
//                 }
//                 { playerOne.includes(5) &&
//                     <p
//                     className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4 border-orange-500'
//                 ><AiOutlineClose
//                     className="h-full w-full text-yellow-600"
//                 />
//                 </p>
//                 }
//                 { playerTwo.includes(5) &&
//                     <p
//                     className='w-[150px] h-[150px] border-4 border-orange-500'
//                 ><AiTwotoneMeh
//                 className="h-full w-full"
//                 />
//                 </p>
//                 }






//             { !playerOne.includes(6) && !playerTwo.includes(6) && turn==1 &&
//                 <div
//                     onClick={()=>handleClick(6)}
//                     className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
//                 >
//                 </div>
//                 }
//             { !playerOne.includes(6) && !playerTwo.includes(6) && turn==2 &&
//                 <div
//                     className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent '
//                 >
//                 </div>
//                 }
//                 { playerOne.includes(6) &&
//                     <p
//                     className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent'
//                 ><AiOutlineClose
//                     className="h-full w-full text-yellow-600"
//                 />
//                 </p>
//                 }
//                 { playerTwo.includes(6) &&
//                     <p
//                     className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-orange-500 border-r-transparent'
//                 ><AiTwotoneMeh
//                 className="h-full w-full"
//                 />
//                 </p>
//                 }



//             </div>

//             <div
//                 className='flex flex-row justify-center items-center'
//             >
//                 { !playerOne.includes(7) && !playerTwo.includes(7) && turn==1 &&
//                 <div
//                     onClick={()=>handleClick(7)}
//                     className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
//                 >
//                 </div>
//                 }
//                 { !playerOne.includes(7) && !playerTwo.includes(7) && turn==2 &&
//                 <div
//                     className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 '
//                 >
//                 </div>
//                 }
//                 { playerOne.includes(7) &&
//                     <p
//                     className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4  border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 '
//                 ><AiOutlineClose
//                     className="h-full w-full text-yellow-600"
//                 />
//                 </p>
//                 }
//                 { playerTwo.includes(7) &&
//                     <p
//                     className='w-[150px] h-[150px] border-4  border-t-orange-500 border-l-transparent border-b-transparent border-r-orange-500 '
//                 ><AiTwotoneMeh
//                 className="h-full w-full"
//                 />
//                 </p>
//                 }






//                 { !playerOne.includes(8) && !playerTwo.includes(8) && turn==1 &&
//                 <div
//                     onClick={()=>handleClick(8)}
//                     className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500 cursor-pointer hover:bg-black hover:bg-opacity-30'
//                 >
//                 </div>
//                 }
//                 { !playerOne.includes(8) && !playerTwo.includes(8) && turn==2 &&
//                 <div
//                     className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500 '
//                 >
//                 </div>
//                 }
//                 { playerOne.includes(8) &&
//                     <p
//                     className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500'
//                 ><AiOutlineClose
//                     className="h-full w-full text-yellow-600"
//                 />
//                 </p>
//                 }
//                 { playerTwo.includes(8) &&
//                     <p
//                     className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-orange-500'
//                 ><AiTwotoneMeh
//                 className="h-full w-full"
//                 />
//                 </p>
//                 }






//                 { !playerOne.includes(9) && !playerTwo.includes(9) && turn==1 &&
//                 <div
//                     onClick={()=>handleClick(9)}
//                     className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent cursor-pointer hover:bg-black hover:bg-opacity-30'
//                 >
//                 </div>
//                 }
//                 { !playerOne.includes(9) && !playerTwo.includes(9) && turn==2 &&
//                 <div
//                     className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent  '
//                 >
//                 </div>
//                 }
//                 { playerOne.includes(9) &&
//                     <p
//                     className='flex flex-row justify-center items-center w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent'
//                 ><AiOutlineClose
//                     className="h-full w-full text-yellow-600"
//                 />
//                 </p>
//                 }
//                 { playerTwo.includes(9) &&
//                     <p
//                     className='w-[150px] h-[150px] border-4 border-t-orange-500 border-l-orange-500 border-b-transparent border-r-transparent'
//                 ><AiTwotoneMeh
//                 className="h-full w-full"
//                 />
//                 </p>
//                 }
//             </div>


//             {whoWins==1 && 
//                 <Modal>
//                     <Messages
//                         id={1}
//                     />
//                 </Modal>
//             }    
//             {whoWins==2 && 
//                 <Modal>
//                     <Messages
//                         id={2}
//                     />
//                 </Modal>
//             }    
//             {whoWins==3 && 
//                 <Modal>
//                     <Messages
//                         id={3}
//                     />
//                 </Modal>
//             }    
//             {seeStart && 
//                 <Modal>
//                     <Instructions
//                         handleSubmit={handleSubmit}
//                     />
//                 </Modal>
//             }    






//     </div>
//   )
// }

// export default Board