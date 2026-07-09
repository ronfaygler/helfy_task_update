function Filter({ filterTasks, setFilter }) {
    return (
        <>
            <h2> Filter </h2>
            <select onChange={(e) => {
                filterTasks(e.target.value);
                setFilter(e.target.value);
            }}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="not completed">Not Completed</option>
            </select>
        </>
    );
}

export default Filter;