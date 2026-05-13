import { useEffect, useState } from "react";

function TaskModal({
  setShowModal,
  tasks,
  setTasks,
  selectedTask,
  setSelectedTask,
}) {

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("");

  useEffect(() => {

    if (selectedTask) {
      setTitle(selectedTask.title);
      setPriority(selectedTask.priority);
      setAssignee(selectedTask.assignee);
    }

  }, [selectedTask]);

  const handleSubmit = () => {

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    if (selectedTask) {

      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              title,
              priority,
              assignee,
            }
          : task
      );

      setTasks(updatedTasks);

    } else {

      const newTask = {
        id: Date.now(),
        title,
        priority,
        assignee,
        status: "todo",
      };

      setTasks([newTask, ...tasks]);
    }

    setShowModal(false);
    setSelectedTask(null);

    setTitle("");
    setPriority("Medium");
    setAssignee("");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-gray-900 w-[450px] rounded-2xl p-8 border border-gray-800">

        <h2 className="text-3xl font-bold mb-8">

          {selectedTask ? "Edit Task" : "Create Task"}

        </h2>

        <div className="mb-5">

          <label className="block mb-2 text-gray-300">
            Task Title
          </label>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

        </div>

        <div className="mb-5">

          <label className="block mb-2 text-gray-300">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

        </div>

        <div className="mb-8">

          <label className="block mb-2 text-gray-300">
            Assignee
          </label>

          <input
            type="text"
            placeholder="Enter assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

        </div>

        <div className="flex justify-end gap-4">

          <button
            onClick={() => {
              setShowModal(false);
              setSelectedTask(null);
            }}
            className="bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl"
          >

            {selectedTask ? "Save Changes" : "Create"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default TaskModal;