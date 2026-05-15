import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";

import initialTasks from "./data/tasks";

function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : initialTasks;
  });

  // Dynamic columns with local storage
  const [columns, setColumns] = useState(() => {

    const savedColumns =
      localStorage.getItem("columns");

    return savedColumns
      ? JSON.parse(savedColumns)
      : [
          "Backlog",
          "Todo",
          "In Progress",
          "Done",
        ];
  });

  const [previousTasks, setPreviousTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [columnModal, setColumnModal] = useState(false);

  const [newColumn, setNewColumn] = useState("");

  const [selectedTask, setSelectedTask] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [assigneeFilter, setAssigneeFilter] =
    useState("All");



  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  }, [tasks]);


  // save columns
  useEffect(() => {

    localStorage.setItem(
      "columns",
      JSON.stringify(columns)
    );

  }, [columns]);



  const updateTasks = (newTasks) => {

    setPreviousTasks(tasks);

    setTasks(newTasks);
  };



  const handleUndo = () => {

    if (previousTasks.length > 0) {

      setTasks(previousTasks);

      setPreviousTasks([]);
    }
  };



  const addColumn = () => {

    if (!newColumn.trim()) {
      alert("Enter column title");
      return;
    }

    if (
      columns.some(
        col =>
          col.toLowerCase() ===
          newColumn.toLowerCase()
      )
    ) {
      alert("Column already exists");
      return;
    }

    setColumns([
      ...columns,
      newColumn
    ]);

    setNewColumn("");

    setColumnModal(false);
  };


  // delete custom columns
  const deleteColumn = (columnName) => {

    const defaultColumns = [
      "Backlog",
      "Todo",
      "In Progress",
      "Done"
    ];

    if (
      defaultColumns.includes(columnName)
    ) {

      alert(
        "Default columns cannot be deleted"
      );

      return;
    }

    setColumns(
      columns.filter(
        (col) =>
          col !== columnName
      )
    );
  };



  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    const matchesAssignee =
      assigneeFilter === "All" ||
      task.assignee === assigneeFilter;

    return (
      matchesSearch &&
      matchesPriority &&
      matchesAssignee
    );
  });



  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar
        setShowModal={setShowModal}
        handleUndo={handleUndo}
        openColumnModal={() =>
          setColumnModal(true)
        }
      />

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        assigneeFilter={assigneeFilter}
        setAssigneeFilter={setAssigneeFilter}
        tasks={tasks}
      />

      <Board
        tasks={filteredTasks}
        allTasks={tasks}
        setTasks={updateTasks}
        setShowModal={setShowModal}
        setSelectedTask={setSelectedTask}
        columns={columns}
        deleteColumn={deleteColumn}
      />

      <div className="px-8 pb-6 text-gray-400 text-lg border-t border-gray-800 pt-5">
        Total Tasks:
        {" "}
        {filteredTasks.length}
      </div>

      {showModal && (
        <TaskModal
          setShowModal={setShowModal}
          tasks={tasks}
          setTasks={updateTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      )}

      {/* Column Modal */}
      {columnModal && (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

          <div className="bg-gray-900 p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Add New Column
            </h2>

            <input
              type="text"
              value={newColumn}
              onChange={(e)=>
                setNewColumn(
                  e.target.value
                )
              }
              placeholder="Column title..."
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
            />

            <div className="flex gap-4 mt-5">

              <button
                onClick={addColumn}
                className="bg-green-600 px-4 py-2 rounded-lg"
              >
                Add
              </button>

              <button
                onClick={() =>
                  setColumnModal(false)
                }
                className="bg-red-600 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;