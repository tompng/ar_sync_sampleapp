class FollowsController < ApplicationController
  def index
    render html: '', layout: true
  end

  def follow
    current_user.followings.where(to: User.find(params[:user_id])).first_or_create!
    head :ok
  end

  def unfollow
    current_user.followings.find_by(to: User.find(params[:user_id]))&.destroy
    head :ok
  end
end
