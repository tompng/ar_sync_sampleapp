class SyncApiController < ApplicationController
  include ArSync::ApiControllerConcern

  serializer_field :newposts, type: [Post] do
    Post.sync_collection(:latest10)
  end
  serializer_field :profile, type: User do |user|
    user
  end
  serializer_field :user, type: User do |_user, id:|
    User.find id
  end
  serializer_field :post, type: Post do |_user, id:|
    Post.find id
  end
  serializer_field :comment, type: Comment do |_user, id:|
    Comment.find id
  end

  # Reload API for all types should be defined here.

  serializer_field Post, type: Post do |_user, ids:|
    Post.where id: ids
  end
  serializer_field Comment, type: Comment do |_user, ids:|
    Comment.where id: ids
  end
  serializer_field User, type: User do |_user, ids:|
    User.where id: ids
  end
  serializer_field Follow, type: Follow do |_user, ids:|
    Follow.where id: ids
  end
  serializer_field Reaction, type: Reaction do |_user, ids:|
    Reaction.where id: ids
  end
end
