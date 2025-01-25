import React, { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native-web"
import { getTasks } from "../utils/storage"

const HomeScreen = ({ navigate }) => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(getTasks())
  }, [])

  const renderTask = ({ item }) => (
    <TouchableOpacity style={styles.taskItem} onPress={() => navigate("TaskDetail", { taskId: item.id })}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList data={tasks} renderItem={renderTask} keyExtractor={(item) => item.id} />
      <TouchableOpacity style={styles.addButton} onPress={() => navigate("AddTask")}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  taskItem: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "gray",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
  },
})

export default HomeScreen

