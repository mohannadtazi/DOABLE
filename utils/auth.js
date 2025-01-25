// This is a simple mock authentication.
// In a real app, you'd want to use more secure methods.

const users = [{ email: "user@example.com", password: "password123" }]

export const authenticate = (email, password) => {
  const user = users.find((u) => u.email === email && u.password === password)
  return user !== undefined
}

