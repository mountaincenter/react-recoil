import { AxiosResponse } from "axios"
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

export interface ApiResponse<T> extends AxiosResponse {
  data: T;
}
export interface CurrentUserApiResponse extends AxiosResponse {
  currentUser: User;
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

export interface Post {
  id: number;
  content: string;
  images: Image[];
  user: User;
  likes: likesProps[];
  liked: boolean;
  bookmarked: boolean;
  bookmarksCount: number;
  publicId: string;
  parent: Post;
  replies: Post[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostData {
  content: string;
  images: File[];
  parentId?: number;
}
export interface PostFormData extends FormData {
  append: (
    name : keyof PostData,
    value: string | number | Blob,
    fileName?: string
  ) => void;
}

export interface likesProps {
  id: number;
  user: User;
  post: Post;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  url: string;
}

export interface Notification {
  id: number;
  userId: number;
  message: {
    avatar: {
      url: string
    },
    name: string,
    body?: string,
  }
  notificationType: string;
  notificationId: number;
  notifiableType: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trend {
  name: string;
  postsCount: number
}

interface LoginProps {}
interface LogoutProps {}
interface SignupProps{}
export interface ReplyProps {
  publicId: string;
}
export type DialogProps = LoginProps | LogoutProps | SignupProps | ReplyProps;
export interface DialogState<T>  {
  isOpen: boolean;
  type: DialogType;
  props?: T
}

export type DialogType = 'login' | 'signup' | 'logout' | 'reply' | 'edit' | 'post' | null;