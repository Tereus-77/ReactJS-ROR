class Api::V1::SessionsController < ApplicationController
  include AuthorisationResponseConcerns

  before_action :authorize_request, except: [:login, :refresh_token], raise: false

  def login
    @user = User.find_by_email(params[:email])
    if @user&.valid_password?(params[:password])
      create_access_refresh_token(@user)
    else
      error_json_response ['Invalid Email or Password'], :unauthorized
    end
  end

  def refresh_token
    if params[:refresh_token]
      refresh_token = params[:refresh_token]
    else
      refresh_token = cookies.signed[:wc_refresh_token]
    end
    token = RefreshToken.find_by(refresh_token: refresh_token)
    @user = User.find(token.user_id) if token
    if @user
      create_access_refresh_token(@user)
    else
      error_json_response ['Invalid Refresh Token'], :unauthorized
    end
  end

  # DELETE /api/logout
  def logout
    @user = User.find(@decoded[:user_id])
    purge_auth_tokens(@user)
    purge_cookies
    success_json_response({message: 'Successfully logged out'})
  end

end
