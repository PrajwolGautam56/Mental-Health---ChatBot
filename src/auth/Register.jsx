import  { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmail,addToken,addUserId } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';


const Register = ( ) => {

  //  const navigate = useNavigate();
   
   const [name, setName] = useState(" ");
   const [email, setEmail] = useState(" ");
   const [password, setPassword] = useState("");

   const dispatch = useDispatch();

   
   // function to register user 
   const handleSignup = async(e) => {
    e.preventDefault();
    const data   = await fetch("http://172.20.139.248:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"},
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
    });

   
 const result = await data.json();


   console.log( result);
   if(!result){
    console.log("No data");
   }

   
  



    
     
    };

 

  

  return (


    <div className="max-w-md mx-auto">
      <form onSubmit={handleSignup} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name='name'
            type="name"
            placeholder="Name"
            value={name}
            onChange= {(e)=>setName(e.target.value)}
          />
        </div>




       



        

 






        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange= {(e)=>setEmail(e.target.value)}
          />
        </div>



        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="**********"
            value={password}
            onChange= {(e)=>setPassword(e.target.value)}
          />
        </div>


         
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )};

export default Register;

