import React, { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native-web"
import { getTaskById, toggleSubtask } from "../utils/storage"

const TaskDetailScreen = ({ navigate, taskId }) => {
  const [task, setTask] = useState(null)

  useEffect(() => {
    setTask(getTaskById(taskId))
  }, [taskId])

  const handleToggleSubtask = (subtaskId) => {
    toggleSubtask(taskId, subtaskId)
    setTask(getTaskById(taskId))
  }

  const renderSubtask = ({ item }) => (
    <TouchableOpacity style={styles.subtaskItem} onPress={() => handleToggleSubtask(item.id)}>
      <Text style={[styles.subtaskText, item.isCompleted && styles.completedSubtask]}>{item.description}</Text>
    </TouchableOpacity>
  )

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.subtasksTitle}>Subtasks:</Text>
      <FlatList data={task.subtasks} renderItem={renderSubtask} keyExtractor={(item) => item.id} />
      <TouchableOpacity style={styles.editButton} onPress={() => navigate("EditTask", { taskId })}>
        <Text style={styles.editButtonText}>Edit Task</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  subtasksTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtaskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  subtaskText: {
    fontSize: 16,
  },
  completedSubtask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  editButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
  },
})

export default TaskDetailScreen

