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
