import {useState} from 'react'

export default function SearchBox({setUser}){
    const [input, setInput] = useState('')

    function getUserData(e){
        e.preventDefault()
        if(input.trim().length === 0)   return 
        fetch(`https://api.github.com/users/${input.trim()}`)
            .then(response => {
                if(response.status === 200)
                    return response.json()
                setUser({})
            })
            .then(data => {
                setUser(data)
            })
            .catch(error => {
                console.log(`Error: ${error}`);
            })
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