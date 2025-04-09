import { userService } from "../services/user.service.js"

const { useEffect, useState } = React

export function UserIndex() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        userService.query()
            .then(user => setUsers(user))
    }
        , [])

    if (!users) return
    return (
        <section>
            <div>UserIndex</div>
            {users.map(user => {
                return (

                    <div>
                        <h2>{user.fullname}</h2>
                        <button>X</button>
                        <button>Edit</button>

                    </div>
                )
            })}
        </section>

    )
}