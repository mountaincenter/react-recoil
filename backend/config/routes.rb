Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }
  namespace :auth do
    resources :sessions, only: %i[index]
    post 'guest_sign_in', to: 'sessions#guest_sign_in'
  end


  resources :notifications, only: %i[index update] do
    collection do
      put :mark_all_as_read
    end
  end
  resources :users, only: %i[index show update]  do
    resource :follows, only: %i[create destroy]
    resource :mutes, only: %i[create destroy]
    member do
      get :following, :followers
    end
    collection do
      get :bookmarking
    end
  end
  resources :messages, only: %i[index create] do
    get :conversations, on: :member
  end
  resources :todos
  resources :posts, only: %i[index create destroy show] do
    resource :bookmarks, only: %i[create destroy]
    resource :likes, only: %i[create destroy]
    post :reply, on: :member
  end

  resources :hashtags, only: [] do
    member do
      get 'posts', to: 'hashtags#posts', as: 'posts'
    end
  end

  resources :trends, only: [:index]
  get 'searches', to: 'searches#index'

end
