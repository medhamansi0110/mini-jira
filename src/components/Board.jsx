import Column from "./Column";
import { DndContext } from "@dnd-kit/core";

function Board({
  tasks,
  allTasks,
  setTasks,
  setShowModal,
  setSelectedTask,
  columns,
  deleteColumn,
}) {

  const handleDragEnd = (event) => {

    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;

    let newStatus = over.id;

    const droppedTask = allTasks.find(
      (task) => String(task.id) === String(over.id)
    );

    if (droppedTask) {
      newStatus = droppedTask.status;
    }

    const updatedTasks = allTasks.map((task) => {

      if (String(task.id) === String(taskId)) {

        return {
          ...task,
          status: newStatus,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const colors = [
    "#6b7280",
    "#2563eb",
    "#f59e0b",
    "#22c55e",
    "#ec4899",
    "#8b5cf6",
    "#ef4444",
    "#14b8a6",
  ];

  return (

    <DndContext onDragEnd={handleDragEnd}>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-8">

        {columns.map((column, index) => (

          <Column
            key={column}
            title={column}
            color={colors[index % colors.length]}

            tasks={
              tasks.filter(
                (task) =>
                  task.status.toLowerCase() ===
                  column
                    .toLowerCase()
                    .replace(/\s+/g, "")
              )
            }

            allTasks={allTasks}
            setTasks={setTasks}
            setShowModal={setShowModal}
            setSelectedTask={setSelectedTask}

            deleteColumn={deleteColumn}
          />

        ))}

      </div>

    </DndContext>
  );
}

export default Board;