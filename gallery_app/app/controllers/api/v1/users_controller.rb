class Api::V1::UsersController < ApplicationController

  before_action :authorize_request, except: [:create], raise: false
  before_action :set_user, only: [:update, :destroy, :show]

  def index
    @q = User.ransack(params[:q])
    @users = @q.result.paginate(page: params[:page], per_page: 10).all
    render layout: 'layouts/api'
  end

  def show
    render layout: 'layouts/api'
  end

  def create
    @user = User.new(user_params)

    if @user.save
      @message = "Successfully created"
      render layout: 'layouts/api'
    else
      error_json_response @user.errors.full_messages, :bad_request
    end
  end

  def update
    if @user.update(user_params)
      @message = "Successfully updated"
      render layout: 'layouts/api'
    else
      error_json_response @user.errors.full_messages, :bad_request
    end
  end

  def destroy
    if @user.destroy
      success_json_response({message: "Destroyed successfully."})
    else
      error_json_response @user.errors.full_messages, :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end

  def set_user
    @user = User.find(params[:id])
  end
end