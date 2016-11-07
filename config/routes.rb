Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }

  post 'users/authentication', to: 'users/authentication#create'

  get 'secure_pages/dashboard'

  get 'pages/auth_widget'

  root 'pages#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
