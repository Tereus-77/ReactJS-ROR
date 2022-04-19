module AuthorisationResponseConcerns
  def create_access_refresh_token(user)
    @user = user
    token = JsonWebToken.encode(user_id: @user.id)
    refresh_token = SecureRandom.urlsafe_base64(nil, false)
    @user.refresh_tokens.create(refresh_token: refresh_token)
    time = JsonWebToken.expiry_time
    refresh_expiry_time = JsonWebToken.refresh_expiry_time
    cookies.signed[:gallery_token] = {value: token, httponly: true, expires: time}
    cookies.signed[:gallery_refresh_token] = {value: refresh_token, httponly: true, expires: refresh_expiry_time}
    success_json_response({token: token,
                           exp: time.strftime('%m-%d-%Y %H:%M'),
                           refresh_token: refresh_token,
                           user: user_object
                          })
  end

  def user_object
    JSON.parse(render_to_string(template: '/api/v1/users/show'))
  end

  def purge_auth_tokens(user)
    user.blacklisted_tokens.create(token: @authentication_token)
    user.refresh_tokens.destroy_all
  end

  def purge_cookies
    cookies.delete :gallery_token
    cookies.delete :gallery_refresh_token
  end
end
