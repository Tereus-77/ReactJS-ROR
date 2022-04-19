module RequestSpecHelper
  def json
    JSON.parse(response.body)
  end

  def confirm_and_login_user(user)
    post api_v1_login_path, params: {email: user.email, password: "password"}, as: :json
    json['data']['token']
  end
end