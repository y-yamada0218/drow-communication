Rails.application.routes.draw do
  devise_for :users
  root "fronts#index"
  # get 'fronts', to: 'fronts#join', as: 'join' 
  # get 'drows', to: 'drows#leave', as: 'leave'
  resources :users, only: [:edit, :update, :index]
  resources :fronts, only: [:edit, :update, :index]
  resources :rooms, only: [:new, :show, :create, :edit, :update,]

  namespace :api do
    resources :rooms, only: :index, defaults: { format: 'json' }
  end
end
