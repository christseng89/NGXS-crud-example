const todos = [
  { id: 5001, title: "Buy milk", userId: "123", completed: false },
  { id: 5002, title: "Take computer lessons", userId: "123", completed: false },
  { id: 5003, title: "Goto school", userId: "123", completed: false },
  { id: 5004, title: "Interview Teresa", userId: "123", completed: false },
];

todos.splice(
  todos.findIndex((i) => i.id === 5002),
  1
);

let todo = { title: "Hire Teresa", completed: true };
const idx = todos.findIndex((i) => i.id === 5004);
if (idx > -1) {
  todos[idx] = { ...todos[idx], ...todo };
}

console.log(todos);
