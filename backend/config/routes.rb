Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }
  namespace :auth do
    resources :sessions, only: %i[index]
  end

  resources :notifications, only: %i[index update] do
    collection do
      put :mark_all_as_read
    end
  end
  resources :users, only: %i[index show update]  do
    resource :follows, only: %i[create destroy]
    member do
      get :following, :followers
    end
  end
  resources :messages, only: %i[index create] do
    get :conversations, on: :member
  end
  resources :todos
end
