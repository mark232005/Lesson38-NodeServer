import { authService } from "../services/auth.service.js";
import { userService } from "../services/user.service.js";
import { showErrorMsg } from "../services/event-bus.service.js";

const { useState } = React
const { useNavigate } = ReactRouter




export function LoginSignup({ setLoggedinUser }) {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignup, setIsSignUp] = useState(false)
    const navigate = useNavigate()

    function handelSubmit(ev) {
        ev.preventDefault()
        isSignup ? signup(credentials) : login(credentials)
    }
    function handelChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function login(credentials) {
        authService.login(credentials).then(user => {
            setLoggedinUser(user)
            navigate('/bug')
        }).catch(err => {
            console.log(err)
            showErrorMsg(`Couldn't login...`)
        })
    }
    function signup() {
        authService.signup(credentials).then(user => {
            setLoggedinUser(user)
            navigate('/bug')

        }).catch(err => {
            console.log(err)
            showErrorMsg(`Couldn't login...`)
        })
    }

    return (
        <section className='login-page'>
            <form className='login-form' onSubmit={handelSubmit}>
                <input
                    type="text"
                    value={credentials.username}
                    name="username"
                    onChange={handelChange}
                    placeholder='Username'
                    required
                    autoFocus
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handelChange}
                    placeholder='Password'
                    required
                    autoComplete="off"
                />
                {isSignup &&
                    <input
                        type="text"
                        value={credentials.fullname}
                        name="fullname"
                        onChange={handelChange}
                        placeholder='Fullname'
                        required
                        autoFocus
                    />
                }
                <button>{isSignup?'Sigin':'Login'}</button>
            </form>
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </section>
    )
}