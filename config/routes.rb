Rails.application.routes.draw do
  root to: "pages#root"
  devise_for :users
end
