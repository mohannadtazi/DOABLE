import { AuthScreen, HomeScreen, TaskDetailScreen, AddTaskScreen, EditTaskScreen } from "./components"
import React, { useState } from "react"
import { View, StyleSheet } from "react-native-web"

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("Auth")
  const [currentTask, setCurrentTask] = useState(null)

  const navigate = (screenName, params = {}) => {
    setCurrentScreen(screenName)
    if (params.taskId) {
      setCurrentTask(params.taskId)
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "Auth":
        return <AuthScreen navigate={navigate} />
      case "Home":
        return <HomeScreen navigate={navigate} />
      case "TaskDetail":
        return <TaskDetailScreen navigate={navigate} taskId={currentTask} />
      case "AddTask":
        return <AddTaskScreen navigate={navigate} />
      case "EditTask":
        return <EditTaskScreen navigate={navigate} taskId={currentTask} />
      default:
        return <AuthScreen navigate={navigate} />
    }
  }

  return <View style={styles.container}>{renderScreen()}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})

export default App

