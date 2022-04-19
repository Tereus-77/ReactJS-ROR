Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do

      post 'login', to: 'sessions#login', as: "login"
      post 'refresh_token', to: 'sessions#refresh_token', as: "refresh_token"
      delete 'logout', to: 'sessions#logout', as: "logout"

      resources :tags
      resources :users
      resources :comments
      resources :galleries do
        resources :photos
      end
    end
  end
end
