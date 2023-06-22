Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }
  namespace :auth do
    resources :sessions, only: %i[index]
  end

  resources :users, only: %i[index show] do
    resource :follows, only: %i[create destroy]
    member do
      get :following, :followers
    end
  end
  resources :todos
end
