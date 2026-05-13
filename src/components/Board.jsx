import Column from "./Column";

import { DndContext } from "@dnd-kit/core";

function Board({
  tasks,
  allTasks,
  setTasks,
  setShowModal,
  setSelectedTask,
}) {

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  );

  const progressTasks = tasks.filter(
    (task) => task.status === "inprogress"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  );

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

  return (

    <DndContext onDragEnd={handleDragEnd}>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">

        <Column
          title="Todo"
          color="#2563eb"
          tasks={todoTasks}
          allTasks={allTasks}
          setTasks={setTasks}
          setShowModal={setShowModal}
          setSelectedTask={setSelectedTask}
        />

        <Column
          title="In Progress"
          color="#f59e0b"
          tasks={progressTasks}
          allTasks={allTasks}
          setTasks={setTasks}
          setShowModal={setShowModal}
          setSelectedTask={setSelectedTask}
        />

        <Column
          title="Done"
          color="#22c55e"
          tasks={doneTasks}
          allTasks={allTasks}
          setTasks={setTasks}
          setShowModal={setShowModal}
          setSelectedTask={setSelectedTask}
        />

      </div>

    </DndContext>
  );
}

export default Board;