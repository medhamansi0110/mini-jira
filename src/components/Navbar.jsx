import { FaMoon, FaUndo } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

function Navbar({
  setShowModal,
  handleUndo,
  openColumnModal,
}) {
  return (
    <div className="w-full flex items-center justify-between px-8 py-5 border-b border-gray-800 bg-black">

      <h1 className="text-3xl font-bold text-white">
        <span className="text-blue-500">Mini</span> Jira
      </h1>

      <div className="flex items-center gap-4">

        {/* Add Task */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl font-semibold transition"
        >
          + Add Task
        </button>

        {/* Add Column */}
        <button
          onClick={openColumnModal}
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl font-semibold transition"
        >
          + Add Column
        </button>

        {/* Undo */}
        <button
          onClick={handleUndo}
          className="bg-gray-900 border border-gray-700 hover:bg-gray-800 px-5 py-2 rounded-xl flex items-center gap-2 transition"
        >
          <FaUndo />
          Undo
        </button>

        {/* Dark mode */}
        <button className="bg-gray-900 border border-gray-700 p-3 rounded-full hover:bg-gray-800 transition">
          <FaMoon />
        </button>

        <div className="flex items-center gap-3 bg-black px-3 py-2 rounded-xl cursor-pointer">

          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
            AM
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Admin</span>
            <IoChevronDown />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Navbar;