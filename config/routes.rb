Rails.application.routes.draw do
  devise_for :users
  root "fronts#index"
  get 'room/:id', to: 'rooms#join', as: 'join' 
  post 'room/:id', to: 'fronts#index', as: 'leave'
  resources :users, only: [:edit, :update, :index]
  resources :fronts, only: [:edit, :update, :index]
  resources :rooms, only: [:new, :show, :create, :edit, :update,]
end
