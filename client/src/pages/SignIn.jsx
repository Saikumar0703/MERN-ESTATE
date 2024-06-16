import React,{useState} from 'react'
import { data } from 'autoprefixer'
import {Link , useNavigate} from 'react-router-dom'

export default function SignIn() {
  
  const [formdata,setformdata] = useState({})

  const [loading,setloading] = useState(false)

  const [error,seterror] = useState(null)

  const Navigate = useNavigate()

  const handleChange=(e)=>{
    
    setformdata(
      {...formdata,
        [e.target.id] : e.target.value,
      });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{

      setloading(true);
      
    seterror(null);

   const res =await fetch('/api/auth/signup', {
    method:"POST",
    headers:{
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(formdata),
   }) ;
   const data =await res.json();
   console.log(data)

   if(data.success === false){
     seterror(data.message);
     setloading(false);
     return
   }
   setloading(false)
   seterror(null)
   Navigate("/sign-in");
   console.log(data)
    }
    catch(error){
      setloading(false)
      seterror(data.message)
    }
    
  };

  
  console.log(formdata)
  return (
    <>
    <div>Sign-in</div>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign-in</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <input type="text"  placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
      <input type="email"  placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
      <input type="password"  placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to={"/sign-out"}>
           <span className='text-blue-700'>Sign in</span>
        </Link>  
      </div>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
    </>
     )
}