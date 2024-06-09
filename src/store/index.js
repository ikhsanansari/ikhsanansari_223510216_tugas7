import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref(JSON.parse(localStorage.getItem('todos')) || []);

  const addTodo = (text) => {
    todos.value.push({ text, completed: false, editing: false });
    saveTodos();
  };

  const removeTodo = (index) => {
    todos.value.splice(index, 1);
    saveTodos();
  };

  const toggleTodo = (index) => {
    todos.value[index].completed = !todos.value[index].completed;
    saveTodos();
  };

  const editTodo = (index, newText) => {
    todos.value[index].text = newText;
    todos.value[index].editing = false;
    saveTodos();
  };

  const startEditing = (index) => {
    todos.value[index].editing = true;
  };

  const stopEditing = (index) => {
    todos.value[index].editing = false;
  };

  const incompleteTodosCount = computed(() => {
    return todos.value.filter(todo => !todo.completed).length;
  });

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value));
  };

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo,
    startEditing,
    stopEditing,
    incompleteTodosCount,
  };
});
