export interface User {
  id: string
  username: string
  url: string //profile url
}

export interface Task {
  id: string
  title: string
  deadline: string
  assignee: User
  completed: boolean
}
