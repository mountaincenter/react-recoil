export interface SignUpData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}


export interface SignInData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  avatar:  {
    url: string;
  }
  profile: string
  password: string;
  uid: string;
  provider: string;
  allowPasswordChange: boolean;
  createdAt?: Date;
  updateAt?: Date;
  todos: Todo[];
  followed?: boolean;
  following?: boolean;
}


export interface Todo {
  id: number,
  title: string,
  isComplete: boolean
  createdAt: Date;
  user: {
    id: number;
    name: string;
    username: string;
    avatar: {
      url: string;
    }
  }
}

export interface DialogState  {
  isOpen: boolean;
  type: DialogType;
}

export type DialogType = 'addTodo' | 'login' | 'signup' | 'logout' | null;