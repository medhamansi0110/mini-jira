# Mini Jira

A modern Kanban-style issue tracking application inspired by Jira, built using ReactJS.  
The application allows users to create, edit, delete, search, filter, and manage tasks across different workflow stages with drag-and-drop functionality.

---
## Live Demo

https://medhamansi0110.github.io/mini-jira/

## Features

- Create new tasks
- Edit existing tasks
- Delete tasks with confirmation
- Drag and drop tasks across columns
- Todo / In Progress / Done workflow
- Search tasks by title
- Filter tasks by priority
- Filter tasks by assignee
- Undo recent action
- Persistent task storage using localStorage
- Responsive dark-themed UI

---

## Tech Stack

- ReactJS
- JavaScript
- Tailwind CSS
- DnD Kit (@dnd-kit/core)

---

## Project Structure

```bash
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Filters.jsx
│   ├── Board.jsx
│   ├── Column.jsx
│   ├── TaskCard.jsx
│   ├── TaskModal.jsx
│
├── data/
│   ├── tasks.js
│
├── App.jsx
├── main.jsx
├── index.css
```

---

## My Approach

I structured the application using reusable React components to keep the code modular and maintainable.

The application state is managed centrally in `App.jsx`, while task-related UI is split into smaller components such as:
- Board
- Column
- TaskCard
- Filters
- Navbar
- TaskModal

For drag-and-drop functionality, I used `@dnd-kit/core` because it provides flexible and lightweight drag handling.

Filtering and searching are handled dynamically using derived filtered task lists, while all updates are applied to the original task state to properly support edge cases like:
- deleting while filters are active
- dragging while filtered
- editing and immediately moving tasks

Task persistence was implemented using `localStorage` so that the board state remains saved after page refresh.

---

## Trade-offs Made

- Reordering tasks within the same column was not fully implemented to keep the drag-and-drop logic simpler and more stable for cross-column movement.
- Undo functionality currently supports only the most recent action instead of maintaining a full action history stack.
- State management was handled using React `useState` instead of Redux or Context API to keep the project lightweight and easy to understand.

---

## Edge Cases Handled

- Very quick consecutive task movements
- Empty columns
- Filtering while tasks are being moved
- Editing a task and immediately moving it
- Deleting tasks while filters are active
- Dropping tasks into occupied columns

---

## Improvements If Given More Time

If I had more time, I would improve the project by adding:

- Full task reordering within the same column
- Better drag-and-drop animations
- Toast notifications for actions
- Light/Dark theme switching
- User authentication and role-based access
- Real-time collaboration support
- Activity logs and task history

---

## Setup Instructions

Install dependencies:

```bash
npm install
```

Run the project:

```bash
npm run dev
```

---

