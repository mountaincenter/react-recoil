class Auth::SessionsController < ApplicationController
  def index
    if current_user
      render json: { status: 200, current_user: current_user }
    else
      render json: { status: 500, message: "ユーザーが存在しません" }
    end
  end

  def guest_sign_in
    user = User.guest
    tokens = user.create_new_auth_token
    response.headers['access-token'] = tokens['access-token']
    response.headers['client'] = tokens['client']
    response.headers['uid'] = tokens['uid']

    render json: { status: 200, user: user }
  end
end