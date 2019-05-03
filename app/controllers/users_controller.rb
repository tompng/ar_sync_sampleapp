class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    render html: '', layout: true
  end
end
