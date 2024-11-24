import React from 'react'
import { useState, useEffect } from 'react'


export default function Main() {

const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: "http://i.imgflip.com/1bij.jpg" 
})

const [allMeme, setAllMeme] = useState([])

useEffect(() => {
    async function getMemes(){
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMeme(data.data.memes)
    }    
    getMemes()
}, [])

function getMemeImage (){
    const randomNumber = Math.floor(Math.random() * allMeme.length)
    const url = allMeme[randomNumber].url
    setMeme(prevMeme => ({
        ...prevMeme,
        randomImage: url
    })
)
}

function handleChange(event){
    const {name, value} = event.target
    setMeme(prevMeme => ({
        ...prevMeme,
        [name]: value
    }))
}



  return (
    <main>
       <div className="form">

            <input 
                type="text" 
                placeholder='Top text'
                name="topText" 
                className='form--input'
                onChange={handleChange}
                value={meme.topText}
            />

            <input 
                type="text" 
                placeholder='Bottom text'
                name="bottomText" 
                className='form--input'
                onChange={handleChange}
                value={meme.bottomText}
            />

            <button className='form--button'
            onClick={getMemeImage}>
            Get a new meme image 🖼
            </button>
       </div>

       <div className="meme">
        <img src={meme.randomImage} alt="meme-defaultImage" className='meme--image'/>
        <h2 className='meme--text top'>{meme.topText}</h2>
        <h2 className='meme--text bottom'>{meme.bottomText}</h2>
       </div>
    </main>
  )
}
