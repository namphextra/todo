export interface Todo {
  Id: number,
  Title: string,
  Content: string,
  Type: string,
  Checked: boolean,
  IsImportant: boolean,
  UpdatedAt: number,
  CreatedAt: number
}

export function getDefaultTodo(): Todo {
  return {
    Id: 0,
    Title: '',
    Content: '',
    Type: '',
    Checked: false,
    IsImportant: false,
    UpdatedAt: 0,
    CreatedAt: 0,
  };
}

export interface User {
  Id: number,
  Username: string,
  Password: string,
  Email: string,
  CreatedAt: number,
  UpdatedAt: number,
}

export function getDefaultUser(): User {
  return {
    Id: 0,
    CreatedAt: 0,
    Email: '',
    Password: '',
    UpdatedAt: 0,
    Username: '',
  };
}
