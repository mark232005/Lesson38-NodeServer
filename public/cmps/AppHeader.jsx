import { authService } from "../services/auth.service.js"
const { useNavigate } = ReactRouter
const { NavLink,Link } = ReactRouterDOM
export function AppHeader({loggedinUser, setLoggedinUser}) {
    const navigate = useNavigate()

    function onLogout(){
authService.logout().then(()=>{
    setLoggedinUser(null)
    navigate('/auth')
})
    }
    return <header className="app-header main-content single-row">
        <h1>Miss Bug</h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/bug">Bugs</NavLink>
            <NavLink to="/about">About</NavLink>
            {!loggedinUser?
            <NavLink to="/auth" >Login</NavLink>:
            <div className="user">
               <Link to={`/user/${loggedinUser._id}`}>{loggedinUser.fullname}</Link>
               <button onClick={onLogout}>logout</button> 
            </div>
            
            }
        </nav>
    </header>
}