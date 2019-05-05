Rails.application.routes.draw do
  root 'landing#index'
  devise_for :users
  resources :exams do
    post :import, on: :member
  end
end
