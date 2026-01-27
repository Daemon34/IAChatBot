import { useState } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")

  const sendToBackend = async () => {
    const res = await axios.post('http://localhost:5152/chat', { content: message }); 
    setResponse(res.data.text);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chatbot IA (.NET + React)</h1>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendToBackend}>Envoyer</button>
      <p>Réponse du serveur : {response}</p>
    </div>
  )
}

export default App