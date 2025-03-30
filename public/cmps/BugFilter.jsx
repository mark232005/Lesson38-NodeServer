const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break
            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }
    function handleSortToggle(field) {
        setFilterByToEdit(prevFilter => {
            const newSortField = prevFilter.sortField === field ? null : field 
            return { ...prevFilter, sortField: newSortField }
        })
    }
    const { txt, minSeverity } = filterByToEdit
    return (
        <section className="bug-filter">
            <h2>Filter</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Text: </label>
                <input value={txt} onChange={handleChange} type="text" placeholder="By Text" id="txt" name="txt" />

                <label htmlFor="minSeverity">Min Severity: </label>
                <input value={minSeverity} onChange={handleChange} type="number" placeholder="By Min Severity" id="minSeverity" name="minSeverity" />
            </form>
            <div className="sorting">
                Sort:
                <label>
                    <span>Title</span>
                    <input
                        type="radio"
                        value='title'
                        checked={filterByToEdit.sortField === 'title'}  
                        name="title"
                        onChange={()=>handleSortToggle('title')}

                    />
                </label>
                <label>
                    <span>Severity</span>
                    <input
                        type="radio"
                        value='severity'
                        checked={filterByToEdit.sortField === 'severity'} 
                        name="severity" 
                        onChange={()=>handleSortToggle('severity')}

                    />
                </label>
                <label>
                    <span>createdAt</span>
                    <input
                        type="radio"
                        value='createdAt'
                        checked={filterByToEdit.sortField === 'createdAt'}  
                        name="createdAt"
                        onChange={()=>handleSortToggle('createdAt')}

                    />
                </label>
            </div>
        </section>
    )
}