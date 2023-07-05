export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  username?: string;
  password: string;
  passwordConfirmation: string
}

export interface UserUpdateData {
  name?: string;
  username?: string;
  email?: string;
  avatar?: {
    url: string;
  }
  profile?: string;
}

export interface UpdateUserFormData extends FormData {
  append: (
    name: keyof UserUpdateData,
    value: string | Blob,
    fileName?: string
  ) => void;
}

export interface User {
  id: number;
  publicId: string;
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

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
}

export interface Message {
  id: number;
  body: string;
  recipient: {
    id: number;
    name: string;
    username: string;
    avatar:{
      url: string;
    },
    publicId: string;
    profile: string;
  },
  sender: {
    id: number;
    name: string;
    username: string;
    avatar:{
      url: string;
    },
    publicId: string;
    profile: string;
  },
  createdAt: Date;
}

export interface Notification {
  id: number;
  userId: number;
  message: string;
  notificationType: string;
  notificationId: number;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User
  notifiable: User | Message
}

export interface DialogState  {
  isOpen: boolean;
  type: DialogType;
}

export type DialogType = 'login' | 'signup' | 'logout' | null;