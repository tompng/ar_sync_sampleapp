class SyncApiController < ApplicationController
  include ArSync::ApiControllerConcern

  # serializer_field :profile, type: User do |_user|
  #   current_user
  # end

  # serializer_field :post, type: Post do |_user, id:|
  #   Post.where(current_user_can_access).find id
  # end

  # Reload API for all types should be defined here.

  # serializer_field :User do |_user, ids:|
  #   User.where(current_user_can_access).where id: ids
  # end

  # serializer_field :Post do |_user, ids:|
  #   Post.where(current_user_can_access).where id: ids
  # end

  # serializer_field :Comment do |_user, ids:|
  #   Comment.where(current_user_can_access).where id: ids
  # end
end
