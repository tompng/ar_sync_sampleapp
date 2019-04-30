class SessionsController < ApplicationController
  skip_before_action :authenticate_user!
  def new
    redirect_to root_path if user_signed_in?
  end

  def create
    login_id = params[:login_id]
    if User.find_by id: login_id
      session[:id] = login_id
      redirect_to root_path
    else
      redirect_to sign_in_path
    end
  end

  def destroy
    session[:id] = nil
    redirect_to sign_in_path
  end
end
