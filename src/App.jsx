import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberallow, setNumberallow] = useState(false)
  const [charallow, setCharallow] = useState(false)
  const [password, setPassword] = useState('')

  //Password generator function
  const passGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    //condition to allow number
    if (numberallow) str += '0123456789'
    //condition to allow specialChracter
    if (charallow) str += '!@#$%^&*()_+~`|}{[]:;?><,./-='
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberallow, charallow])

  //useRef
  let ref = useRef(null)

  //function for copy the password
  const copypassword = () => {
    ref.current.select()
    // ref.current.setSelectionRange(0,4) //This will help to copy only limited text
    window.navigator.clipboard.writeText(password)
  }

  //useEffect

  useEffect( () => {

    passGenerator()

  },[length, numberallow, charallow, passGenerator])

  return (
    <>
      <h1 className='text-white flex flex-wrap justify-center text-[40px]'>Password generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-black-900 hover:bg-gray-500 transition-transform duration-300'>

        <div className='flex shadow rounder-lg mb-4'>

          <input type="text" value={password} placeholder='Password' ref={ref} className='bg-white rounded-lg pl-[5px] outline-none w-full py-1 px-3'/>
          <button className='bg-blue-500 rounded-lg w-[100px] pl-20px hover:bg-blue-400 cursor-pointer' onClick={copypassword}>Copy</button>

        </div>

        <div className='flex items-center gap-x-3'>

          <input type="range" min={8} max={25} className='cursor-pointer' onChange={ (e) => {setLength(e.target.value)} }/><label htmlFor="length input" className='text-white'>Length: {length}</label>

        </div>

        <div className='flex item-center gap-x-3'>
          <input  type="checkbox"  onChange={ () => { setCharallow((prev) => !prev)} }/>
          <label htmlFor="characterInput" className='text-white text-lg hover:text-black'>Characters</label>
        </div>
        <div className='flex item-center gap-x-3'>
           <input  type="checkbox" onChange={ () => {setNumberallow((prev) => !prev )} }/>
          <label htmlFor="characterInput" className='text-white text-lg hover:text-black'>Number </label>
        </div>
      </div>
    </>
  )
}

export default App
