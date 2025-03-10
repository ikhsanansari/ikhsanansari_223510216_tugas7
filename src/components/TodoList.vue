<template>
  <div>
    <h1>List Capaian</h1>
    <div class="input-group">
      <input v-model="newTodoText" placeholder="Buat capaian" />
      <button @click="addNewTodo">Add</button>
    </div>
    <ul>
      <li v-for="(todo, index) in filteredTodos" :key="index">
        <!-- Todo item -->
        <div v-if="!hideCompleted || todo.completed">
          <input type="checkbox" v-model="todo.completed" />
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
          <button @click="editTodoItem(index)">Edit</button>
          <button @click="confirmDelete(index)" class="delete-button">Delete</button>
        </div>
      </li>
    </ul>
    <div class="bottom-section">
      <div class="incomplete-todos">
        <p>Incomplete Todos: {{ incompleteTodosCount }}</p>
      </div>
      <div class="buttons">
        <button @click="filterByCompleted(true)">Selesai</button>
        <button @click="filterByCompleted(false)" class="secondary-button">Semua</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useTodoStore } from '../store';

export default {
  setup() {
    const newTodoText = ref('');
    const todoStore = useTodoStore();
    const hideCompleted = ref(false);

    const addNewTodo = () => {
      if (newTodoText.value.trim()) {
        todoStore.addTodo(newTodoText.value);
        newTodoText.value = '';
      }
    };

    const confirmDelete = (index) => {
      if (window.confirm('Apakah anda ingin menghapus list?')) {
        removeTodoItem(index);
      }
    };

    const removeTodoItem = (index) => {
      todoStore.removeTodo(index);
    };

    const editTodoItem = (index) => {
      const newText = prompt('Enter new text for the todo item:', todoStore.todos[index].text);
      if (newText !== null) {
        todoStore.editTodo(index, newText);
      }
    };

    const filterByCompleted = (completed) => {
      hideCompleted.value = completed;
    };

    const filteredTodos = computed(() => {
      if (hideCompleted.value) {
        return todoStore.todos.filter(todo => todo.completed);
      } else {
        return todoStore.todos;
      }
    });

    const incompleteTodosCount = computed(() => {
      return todoStore.incompleteTodosCount;
    });

    return {
      newTodoText,
      addNewTodo,
      confirmDelete,
      removeTodoItem,
      editTodoItem,
      filterByCompleted,
      hideCompleted,
      filteredTodos,
      incompleteTodosCount,
    };
  },
};
</script>

<style>
.input-group {
  display: flex;
  margin-bottom: 20px;
}

.input-group input {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.input-group button {
  padding: 12px 20px;
  border: none;
  background-color: #1070d7;
  color: white;
  font-size: 16px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.input-group button:hover {
  background-color: #acc0d4;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.delete-button {
  padding: 6px 10px;
  background-color: #dc3545; /* Warna merah */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #bb2d3b;
}

.bottom-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons button {
  margin-left: 10px;
}

.secondary-button {
  padding: 6px 10px;
  background-color: #6c757d; /* Warna abu-abu */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.secondary-button:hover {
  opacity: 0.8;
}

.incomplete-todos {
  margin-right: 10px;
}
</style>
