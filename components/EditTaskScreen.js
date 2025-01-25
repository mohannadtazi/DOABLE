import React, { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native-web"
import { getTaskById, updateTask } from "../utils/storage"

const EditTaskScreen = ({ navigate, taskId }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subtasks, setSubtasks] = useState([])
  const [newSubtask, setNewSubtask] = useState("")

  useEffect(() => {
    const task = getTaskById(taskId)
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setSubtasks(task.subtasks)
    }
  }, [taskId])

  const handleAddSubtask = () => {
    if (newSubtask.trim() !== "") {
      setSubtasks([...subtasks, { id: Date.now().toString(), description: newSubtask.trim(), isCompleted: false }])
      setNewSubtask("")
    }
  }

  const handleUpdateTask = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter both title and description")
      return
    }

    updateTask({ id: taskId, title, description, subtasks })
    alert("Task updated successfully")
    navigate("Home")
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Task Title" value={title} onChangeText={setTitle} />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.subtaskContainer}>
        <TextInput
          style={styles.subtaskInput}
          placeholder="Add Subtask"
          value={newSubtask}
          onChangeText={setNewSubtask}
        />
        <TouchableOpacity style={styles.addSubtaskButton} onPress={handleAddSubtask}>
          <Text style={styles.addSubtaskButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={subtasks}
        renderItem={({ item }) => (
          <View style={styles.subtaskItem}>
            <Text style={styles.subtaskText}>{item.description}</Text>
            <TouchableOpacity
              style={styles.deleteSubtaskButton}
              onPress={() => setSubtasks(subtasks.filter((st) => st.id !== item.id))}
            >
              <Text style={styles.deleteSubtaskButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateTask}>
        <Text style={styles.saveButtonText}>Update Task</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
  },
  subtaskContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  subtaskInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addSubtaskButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  addSubtaskButtonText: {
    color: "white",
  },
  subtaskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  subtaskText: {
    flex: 1,
    fontSize: 16,
  },
  deleteSubtaskButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  deleteSubtaskButtonText: {
    color: "white",
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
})

export default EditTaskScreen

