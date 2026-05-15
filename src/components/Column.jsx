import TaskCard from "./TaskCard";

import { useDroppable } from "@dnd-kit/core";

import { FaTrash } from "react-icons/fa";

function Column({
  title,
  color,
  tasks,
  allTasks,
  setTasks,
  setShowModal,
  setSelectedTask,
  deleteColumn,
}) {

  const { setNodeRef } = useDroppable({
    id: title.toLowerCase().replace(/\s+/g, ""),
  });

  const defaultColumns = [
    "Backlog",
    "Todo",
    "In Progress",
    "Done"
  ];

  const isDefaultColumn =
    defaultColumns.includes(title);

  return (
    <div
      ref={setNodeRef}
      className="bg-black rounded-2xl p-5 flex-1 min-h-[550px] border border-gray-800"
      style={{
        borderTop: `4px solid ${color}`,
      }}
    >

      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <h2 className="text-3xl font-bold">
            {title}
          </h2>

          <span className="bg-gray-900 px-3 py-1 rounded-full text-sm text-gray-300">
            {tasks.length}
          </span>

        </div>

        {/* Delete button only for custom columns */}

        {!isDefaultColumn && (

          <button
            onClick={() =>
              deleteColumn(title)
            }
            className="text-red-500 hover:text-red-700 transition"
          >
            <FaTrash />
          </button>

        )}

      </div>

      <div>

        {tasks.length > 0 ? (

          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              allTasks={allTasks}
              setTasks={setTasks}
              setShowModal={setShowModal}
              setSelectedTask={setSelectedTask}
            />
          ))

        ) : (

          <div className="flex items-center justify-center h-[420px] border-2 border-dashed border-gray-800 rounded-xl text-gray-500">

            No tasks here

          </div>

        )}

      </div>

    </div>
  );
}

export default Column;