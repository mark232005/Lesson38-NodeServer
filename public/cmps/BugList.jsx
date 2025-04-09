const { Link } = ReactRouterDOM

import { BugPreview } from './BugPreview.jsx'

export function BugList({ bugs, onRemoveBug, onEditBug,loggedinUser }) {

    function isCreator(bug) {
        if (!loggedinUser) return false
        if (!bug.creator) return true
        return bug.creator.fullname===loggedinUser.fullname||loggedinUser.isAdmin==='admin'
    }


    if (!bugs) return <div>Loading...</div>

    return <ul className="bug-list">
        {bugs.map(bug => (
            <li key={bug._id}>
                <BugPreview bug={bug} />
                <section className="actions">
                    <button><Link to={`/bug/${bug._id}`}>Details</Link></button>
                    {isCreator(bug)&&
                    <div>
                    <button onClick={() => onEditBug(bug)}>Edit</button>
                    <button onClick={() => onRemoveBug(bug._id)}>x</button>
                    </div>
                    }
                </section>
            </li>
        ))}
    </ul >
}
