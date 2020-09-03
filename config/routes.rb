Rails.application.routes.draw do
  devise_for :users
  root "fronts#index"
  # get 'fronts', to: 'fronts#join', as: 'join' 
  # get 'drows', to: 'drows#leave', as: 'leave'

  resources :users, only: [:edit, :update, :index]
  resources :drows, only: [:index, :update]
  resources :fronts, only: [:edit, :update, :index]
  resources :rooms, only: [:new, :create, :edit, :update,]
  mount ActionCable.server => "/cable"
end
