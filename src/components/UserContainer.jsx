
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
export default function UserContainer({user}){
    let date = Object.keys(user).length && user.created_at.split("-")
    return(
        <div className="user-container">
        {
            Object.keys(user).length ?
                <>
                <div className="profile">
                    <div className="profile-img">
                    <img src={user.avatar_url} alt="Profile" />
                    </div>
                    <div className="username">
                        <h2>{user.name}</h2>
                        <p>Joined {`${date[2].slice(0, date[2].indexOf('T'))} ${months[parseInt(date[1])]} ${date[0]}`}</p>
                    </div>
                </div>


                <p className="bio">
                    {user.bio  || <span className="unavailable">This profile has no bio</span>}
                </p>


                <div className="repo-info">
                    <div className="cols">
                        <label>Repos</label>
                        <h3>{user.public_repos}</h3>
                    </div>
                    <div className="cols">
                        <label>Followers</label>
                        <h3>{user.followers}</h3>
                    </div>
                    <div className="cols">
                        <label>Following</label>
                        <h3>{user.following}</h3>
                    </div>
                </div>

                <p className="more-info location">{user.location || <span className="unavailable">Not Available</span>}</p>
                <p className="more-info url">
                    {user.html_url ?
                    <a href={user.html_url} rel="noreferrer" target="_blank">{user.html_url}</a> 
                    : <span className="unavailable">Not Available</span>}
                </p>
                <p className="more-info twitter">
                    {user.twitter_username ? 
                    <a href={`https://twitter.com/${user.twitter_username}`} rel="noreferrer" target="_blank">{`@${user.twitter_username}`}</a> 
                    : <span className="unavailable">Not Available</span>}
                </p>
                <p className="more-info url">
                    {user.blog ? 
                    <a href={user.blog} rel="noreferrer" target="_blank">{user.blog}</a> 
                    : <span className="unavailable">Not Available</span>}
                </p>
                </>
                :   <span>No User...</span>
        }
        </div>
    )
}