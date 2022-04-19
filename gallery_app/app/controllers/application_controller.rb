class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  include AuthorisationConcerns

  prepend_before_action :set_credentials_header

  if Rails.env.production?
    rescue_from ActiveRecord::RecordNotFound, with: :render_404
    rescue_from AuthorisationError, with: :render_403
    # rescue_from Exception, with: :render_500
  end

  def send_json_response(status, errors, data, status_code)
    render json: {status: status, errors: errors, data: data}, status: status_code
  end

  def error_json_response(errors, status_code )
    send_json_response 'error', errors.map!(&:capitalize), [], status_code
  end

  def success_json_response(data)
    send_json_response "success", [], data , :ok
  end

  def render_500
    error_json_response ["Server error, please try again"], :internal_server_error
  end

  def render_404
    error_json_response ["Record not found"], :not_found
  end

  def render_403
    error_json_response ["You are not authorised to preform this action"], :forbidden
  end



  def set_credentials_header
    response.set_header('Access-Control-Allow-Credentials', 'true')
  end
end
