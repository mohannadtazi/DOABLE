import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native-web"
import { addTask } from "../utils/storage"

const AddTaskScreen = ({ navigate }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subtasks, setSubtasks] = useState([])
  const [newSubtask, setNewSubtask] = useState("")

  const handleAddSubtask = () => {
    if (newSubtask.trim() !== "") {
      setSubtasks([...subtasks, { id: Date.now().toString(), description: newSubtask.trim(), isCompleted: false }])
      setNewSubtask("")
    }
  }

  const handleSaveTask = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter both title and description")
      return
    }

    addTask({ title, description, subtasks })
    alert("Task added successfully")
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
        renderItem={({ item }) => <Text style={styles.subtask}>{item.description}</Text>}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
        <Text style={styles.saveButtonText}>Save Task</Text>
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
  subtask: {
    fontSize: 16,
    marginBottom: 5,
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

export default AddTaskScreen

