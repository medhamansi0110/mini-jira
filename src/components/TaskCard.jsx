import { FaTrash, FaEdit, FaUser } from "react-icons/fa";

import { useDraggable } from "@dnd-kit/core";

function TaskCard({
  task,
  allTasks,
  setTasks,
  setShowModal,
  setSelectedTask,
}) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const priorityColors = {
    High: "bg-red-500/20 text-red-400 border-red-500",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
    Low: "bg-green-500/20 text-green-400 border-green-500",
  };

  const stripColors = {
    High: "#ef4444",
    Medium: "#f59e0b",
    Low: "#22c55e",
  };

  
const handleDelete = () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) return;

  const updatedTasks = allTasks.filter(
    (t) => t.id !== task.id
  );

  setTasks(updatedTasks);
};

  const handleEdit = () => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        borderLeft: `5px solid ${stripColors[task.priority]}`,
      }}
      className="bg-gray-950 border border-gray-800 rounded-2xl p-5 mb-4 shadow-lg hover:scale-[1.01] transition"
    >

      <div
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing"
      >

        <h3 className="text-xl font-semibold mb-5">
          {task.title}
        </h3>

      </div>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <span
            className={`px-3 py-1 rounded-lg text-sm border ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>

          <div className="flex items-center gap-2 text-gray-300">

            <FaUser size={13} />

            <span>
              {task.assignee}
            </span>

          </div>

        </div>

        <div className="flex items-center gap-4 text-gray-400">

          <FaEdit
            onClick={handleEdit}
            className="cursor-pointer hover:text-blue-400 transition"
          />

          <FaTrash
            onClick={handleDelete}
            className="cursor-pointer hover:text-red-400 transition"
          />

        </div>

      </div>

    </div>
  );
}

export default TaskCard;