Rails.application.routes.draw do
  post '/sync_api', to: 'sync_api#sync_call'
  post '/static_api', to: 'sync_api#static_call'
  post '/graphql', to: 'sync_api#graphql_call'

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'top#show'
  get '/react_top', to: 'top#react'

  resources :posts, except: :index do
    member do
      post :reaction
    end
  end
  resources :users, only: %i[index show]

  resources :comments, except: %i[new index] do
    member { post :reaction }
  end

  get '/followings', to: 'follows#followings'
  get '/followeds', to: 'follows#followees'
  resources :follows, only: :index do
    collection do
      post :follow
      post :unfollow
    end
  end

  get '/user/sign_in', to: 'sessions#new', as: :sign_in
  post '/user/sign_in', to: 'sessions#create'
  get '/user/sign_out', to: 'sessions#destroy', as: :sign_out
end
