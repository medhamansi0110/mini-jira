import { FaFilter, FaSearch, FaUser } from "react-icons/fa";

function Filters({
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
  assigneeFilter,
  setAssigneeFilter,
  tasks,
}) {

  const uniqueAssignees = [
    ...new Set(tasks.map((task) => task.assignee)),
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-5 px-8 py-6 bg-black border-b border-gray-800">

      <div className="flex gap-4 flex-wrap">

        <div className="flex items-center gap-3 bg-gray-950 border border-gray-800 px-4 py-3 rounded-xl min-w-[250px]">

          <FaFilter className="text-gray-400" />

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
className="bg-transparent outline-none text-white w-full"
style={{ backgroundColor: "#111827", color: "white" }}          >

            <option value="All">
              All Priorities
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

        </div>

        <div className="flex items-center gap-3 bg-gray-950 border border-gray-800 px-4 py-3 rounded-xl min-w-[250px]">

          <FaUser className="text-gray-400" />

          <select
            value={assigneeFilter}
            onChange={(e) =>
              setAssigneeFilter(e.target.value)
            }
className="bg-transparent outline-none text-white w-full"
style={{ backgroundColor: "#111827", color: "white" }}          >

            <option value="All">
              All Assignees
            </option>

            {uniqueAssignees.map((assignee) => (

              <option
                key={assignee}
                value={assignee}
              >
                {assignee}
              </option>

            ))}

          </select>

        </div>

      </div>

      <div className="flex items-center gap-3 bg-gray-950 border border-gray-800 px-4 py-3 rounded-xl min-w-[320px]">

        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="bg-transparent outline-none text-white w-full"
        />

      </div>

    </div>
  );
}

export default Filters;