Rails.application.routes.draw do
  devise_for :users
  root "fronts#index"
  get 'drows', to: 'drows#index'
  resources :users, only: [:edit, :update, :index]
  mount ActionCable.server => "/cable"
end
