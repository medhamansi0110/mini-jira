import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";

import initialTasks from "./data/tasks";

function App() {

  // Load Tasks from localStorage
  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : initialTasks;
  });

  // Previous Tasks for Undo
  const [previousTasks, setPreviousTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  // Search State
  const [searchTerm, setSearchTerm] = useState("");

  // Priority Filter State
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Assignee Filter State
  const [assigneeFilter, setAssigneeFilter] = useState("All");

  // Save Tasks to localStorage
  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  }, [tasks]);

  // Custom setTasks with Undo Support
  const updateTasks = (newTasks) => {

    setPreviousTasks(tasks);

    setTasks(newTasks);
  };

  // Undo Function
  const handleUndo = () => {

    if (previousTasks.length > 0) {

      setTasks(previousTasks);

      setPreviousTasks([]);
    }
  };

  // Filter Logic
  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

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

      {/* Navbar */}
      <Navbar
        setShowModal={setShowModal}
        handleUndo={handleUndo}
      />

      {/* Filters */}
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        assigneeFilter={assigneeFilter}
        setAssigneeFilter={setAssigneeFilter}
        tasks={tasks}
      />

      {/* Board */}
      <Board
  tasks={filteredTasks}
  allTasks={tasks}
  setTasks={updateTasks}
  setShowModal={setShowModal}
  setSelectedTask={setSelectedTask}
/>

      {/* Footer */}
      <div className="px-8 pb-6 text-gray-400 text-lg border-t border-gray-800 pt-5">
        Total Tasks: {filteredTasks.length}
      </div>

      {/* Modal */}
      {showModal && (
        <TaskModal
          setShowModal={setShowModal}
          tasks={tasks}
          setTasks={updateTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      )}

    </div>
  );
}

export default App;