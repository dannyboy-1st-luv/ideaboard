Rails.application.routes.draw do
 
  get 'home/index'
  root to: 'home#index'
  resources :ideas
  namespace :api do
    namespace :v1 do
      resources :ideas  
    end
  end
end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html




