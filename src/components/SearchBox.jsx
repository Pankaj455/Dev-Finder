import {useState} from 'react'

export default function SearchBox({setUser}){
    const [input, setInput] = useState('')

    async function getUserData(e){
        e.preventDefault()
        if(input.trim().length === 0)   return 
        const response = await fetch(`https://api.github.com/users/${input.trim()}`)
        if(response.status === 200){
            const data = await response.json()
            setUser(data)
            return
        }
        setUser({})
    }
    return(
        <form className="search-box" onSubmit={getUserData}>
            <input 
                type="text"
                placeholder="Search Github Username..."
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <button className="search-btn">search</button>
        </form>
    )
}