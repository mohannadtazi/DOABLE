const TASKS_KEY = "DOABLE_TASKS"

export const initDatabase = () => {
  // No need for initialization with localStorage
}

export const addTask = (title, description, subtasks) => {
  const tasks = getTasks()
  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    subtasks: subtasks.map((subtask) => ({
      id: Date.now().toString() + Math.random(),
      description: subtask,
      isCompleted: false,
    })),
  }
  tasks.push(newTask)
  saveTasks(tasks)
  return newTask.id
}

export const getTasks = () => {
  const tasksJson = localStorage.getItem(TASKS_KEY)
  return tasksJson ? JSON.parse(tasksJson) : []
}

export const getTaskWithSubtasks = (taskId) => {
  const tasks = getTasks()
  return tasks.find((task) => task.id === taskId)
}

export const updateTask = (taskId, title, description, subtasks) => {
  const tasks = getTasks()
  const taskIndex = tasks.findIndex((task) => task.id === taskId)
  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title,
      description,
      subtasks,
    }
    saveTasks(tasks)
  }
}

export const toggleSubtask = (taskId, subtaskId) => {
  const tasks = getTasks()
  const taskIndex = tasks.findIndex((task) => task.id === taskId)
  if (taskIndex !== -1) {
    const subtaskIndex = tasks[taskIndex].subtasks.findIndex((subtask) => subtask.id === subtaskId)
    if (subtaskIndex !== -1) {
      tasks[taskIndex].subtasks[subtaskIndex].isCompleted = !tasks[taskIndex].subtasks[subtaskIndex].isCompleted
      saveTasks(tasks)
    }
  }
}

const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

