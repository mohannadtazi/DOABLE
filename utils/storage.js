const TASKS_KEY = "DOABLE_TASKS"

export const getTasks = () => {
  try {
    const tasksJson = localStorage.getItem(TASKS_KEY)
    return tasksJson ? JSON.parse(tasksJson) : []
  } catch (error) {
    console.error("Error getting tasks:", error)
    return []
  }
}

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error("Error saving tasks:", error)
  }
}

export const addTask = (task) => {
  try {
    const tasks = getTasks()
    const newTask = { ...task, id: Date.now().toString() }
    tasks.push(newTask)
    saveTasks(tasks)
    return newTask
  } catch (error) {
    console.error("Error adding task:", error)
    return null
  }
}

export const getTaskById = (id) => {
  try {
    const tasks = getTasks()
    return tasks.find((task) => task.id === id)
  } catch (error) {
    console.error("Error getting task by id:", error)
    return null
  }
}

export const updateTask = (updatedTask) => {
  try {
    const tasks = getTasks()
    const index = tasks.findIndex((task) => task.id === updatedTask.id)
    if (index !== -1) {
      tasks[index] = updatedTask
      saveTasks(tasks)
      return true
    }
    return false
  } catch (error) {
    console.error("Error updating task:", error)
    return false
  }
}

export const deleteTask = (id) => {
  try {
    const tasks = getTasks()
    const updatedTasks = tasks.filter((task) => task.id !== id)
    saveTasks(updatedTasks)
    return true
  } catch (error) {
    console.error("Error deleting task:", error)
    return false
  }
}

export const toggleSubtask = (taskId, subtaskId) => {
  try {
    const tasks = getTasks()
    const taskIndex = tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      const task = tasks[taskIndex]
      const subtaskIndex = task.subtasks.findIndex((subtask) => subtask.id === subtaskId)
      if (subtaskIndex !== -1) {
        task.subtasks[subtaskIndex].isCompleted = !task.subtasks[subtaskIndex].isCompleted
        saveTasks(tasks)
        return true
      }
    }
    return false
  } catch (error) {
    console.error("Error toggling subtask:", error)
    return false
  }
}

