import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import PdfTextExtractor from './PdfTextExtractor';


function QnAForm() {
  // const userId = useSelector(state => state.userId);  
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversation, setConversation] = useState([]);
  

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);




    try {
      const response = await fetch("http://172.20.139.248:3000/getanswer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit question');
      }
      const responseData = await response.json();
     
      setAnswer(responseData.data);
      const pair = {question:question, answer: responseData.data}
      setConversation(prevConversation => [...prevConversation, pair]);
      console.log(responseData);


      // Add the user's question and the server's answer to the conversation
   
      
    } catch (error) {
      setError(error.message);
    } finally {
      setQuestion("")
      setIsLoading(false);
       
    }
  };





  return (
    <div className=' w-50%  bg-green-200 h-[100vh]'  >
    <div className='header sticky top-0 1 text-2xl'>
    <p className='text-center '><ul role="list" className="divide-y divide-gray-100">
  <li className="flex justify-between gap-x-6  ">
    <div className="flex min-w-0 gap-x-4">
      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDvlb3x5nK3MesvcsPMaDx_fjFvaHb2ssyEbXKVGxRJw&s"  />
      <div className="min-w-0 flex-auto">
        <p className="text-xl font-semibold leading-6 text-gray-900">Team Alpha</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Fire Safety Model</p>
      </div>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p className="text-sm leading-6 text-gray-900"></p>
      <p className="mt-1 text-xs leading-5 text-gray-500 px-3">Last seen 0s ago </p>
    </div>
  </li>

  </ul> </p> 






    
      {/* <PdfTextExtractor />  */}
      <br /> <br />
    </div>
     

    {/* <h2>{answer}</h2> */}

<div className="conversation-container  bottom-0 ">
{conversation.map((pair, index) => (
  <div key={index} className=' conversation-container overflow-scroll p-4'>
    <p className="question p-2  py-4 px-4 mt-2 "><strong> </strong> {pair.question}</p>
    <p className="answer p-1 px-4 py-4 mt-2"><strong> </strong> {pair.answer}</p>
  </div>
))}
</div>
   
      {/* {JSON.stringify(conversation)} */}

      {isLoading && <div> <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://media1.tenor.com/m/jLB4wwou_E0AAAAC/typing-type.gif"  /></div>}
      {error && <div>Error: {error}</div>}
  
     

      <form onSubmit={handleQuestionSubmit} className='flex fixed bottom-0 m-0 send bg-[#FFEBCD]'>
        <label className=" flex shadow appearance-none border rounded w-full py-4 px-4  block text-gray-700 text-sm font-bold mb-2 bg-blanchedalmond" htmlFor="text" >
          Enter your question:
          <input
            className=" bg-grey-200 shadow appearance-none border mt-2 rounded w-full py-1 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"

            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
           <button
            className="  "
         type="submit">      <img className="h-7 w-7 flex-none rounded-full bg-gray-50" src="        https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1XeRR5GHzUmQR-bWTb-U_TD-sDjgBERKMzK3fv0-GUw&s
"  />
</button>
        </label>

       
      </form>

      {/* {conversation.map((mes,key)=>{
        <p key={key}>{mes} </p>
      })} */}


      {/* {conversation.map((pair, index) => (
  <div key={index} className={`conversation-item ${pair.type}`}>
    <p>{pair.content}</p>
  </div>
))} */}









      
     
    </div>
  );
}

export default QnAForm;
