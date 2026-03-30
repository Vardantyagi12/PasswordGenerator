import { useState, useCallback, useEffect } from 'react'
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

  //useEffect

  useEffect( () => {

    passGenerator()

  },[length, numberallow, charallow, passGenerator])

  return (
    <>
      <h1 className='text-white flex flex-wrap justify-center text-[40px]'>Password generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-black-900'>

        <div className='flex shadow rounder-lg mb-4'>

          <input type="text" value={password} placeholder='Password' className='bg-white rounded-lg pl-[5px] outline-none w-full py-1 px-3' />
          <button className='bg-blue-500 rounded-lg w-[100px] pl-20px' >Copy</button>

        </div>

        <div className='flex items-center gap-x-3'>

          <input type="range" min={8} max={25} className='cursor-pointer' onChange={ (e) => {setLength(e.target.value)} }/><label htmlFor="length input" className='text-white'>Length: {length}</label>

        </div>

        <div className='flex item-center gap-x-3'>
          <input  type="checkbox" onChange={ () => { setCharallow((prev) => !prev)} }/>
          <label htmlFor="characterInput" className='text-white text-lg'>Characters</label>
        </div>
        <div className='flex item-center gap-x-3'>
           <input  type="checkbox" onChange={ () => {setNumberallow((prev) => !prev )} }/>
          <label htmlFor="characterInput" className='text-white text-lg'>Number </label>
        </div>
      </div>
    </>
  )
}

export default App
