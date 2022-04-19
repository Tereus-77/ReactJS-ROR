module AuthorisationConcerns
  include ::ActionController::Cookies

  class AuthorisationError < StandardError; end

  def send_json_response(status, errors, data, status_code, args: {})
    render json: {status: status, errors: errors, data: data}.merge(args), status: status_code
  end

  def current_user
    @current_user
  end

  def logged_in?
    @current_user.present?
  end

  def authorize_request
    if request.headers['Authorization']
      authentication_token = request.headers['Authorization']
      @authentication_token = authentication_token.split('Bearer ')[1] if authentication_token
    else
      @authentication_token = cookies.signed[:gallery_token]
    end

    begin
      @decoded = JsonWebToken.decode(@authentication_token)
      @current_user = User.find(@decoded[:user_id]) if @decoded[:user_id]
      raise JWT::DecodeError, 'Invalid token' if black_listed(@authentication_token, @current_user)
    rescue ActiveRecord::RecordNotFound => e
      render json: {status: 'error', errors: [e.message], data: {}}, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: {status: 'error', errors: [e.message], data: {}}, status: :unauthorized
    end
  end

  def black_listed(authentication_token, current_user)
    BlacklistedToken.find_by(token: authentication_token) if current_user[:user_id]
  end
end
