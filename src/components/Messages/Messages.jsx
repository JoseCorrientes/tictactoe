
function Messages({id}) {
  let text;

  switch (id) {
    case 1: {
        text='¡Has Ganado!';
        break;
    }
    case 2: {
        text='¡Has Perdido!';
        break;
    }
    case 3: {
        text='¡Juego Empatado!';
        break;
    }

  }  


  return (
    <div
        className="flex flex-row justify-center items-center fixed inset-0 w-screen h-screen bg-black bg-opacity-70 "
    >
        <div
            className="flex flex-row justify-center items-center w-auto px-10 h-1/6  border-4 rounded-3xl bg-black bg-opacity-100 shadow-white shadow-lg font-fontdinerSwanky text-5xl text-gray-400"
        >
        {text}    
        </div>   
    </div>
  )
}

export default Messages