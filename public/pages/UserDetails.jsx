import { BugList } from "../cmps/BugList.jsx"
import { bugService } from "../services/bug.service.local.js"
import { userService } from "../services/user.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function UserDetails(loggedinUser) {
    const params = useParams()
    const navigate = useNavigate();
    const [bugs, setBugs] = useState([])
    const user = loggedinUser.loggedinUser
    
    useEffect(() => {
        if (user && user._id) {
            loadUserBugs()
        }
    }, [user])



    function loadUserBugs() {
        bugService.query({ profile: user._id })
            .then((response) => { setBugs(response)
                console.log(response);;
            })
            .catch((err) => {
                console.error('Error loading bugs:', err);
            })
    }

    if (!user) return <div>Loag...</div>

    return (
        <section className="user-details">
            <h1>Hello:{user.fullname}</h1>
            <h2>All your bugs:</h2>
            <BugList
            bugs={bugs}
            />
        </section>
    )
}




