class Api::V1::CommentsController < ApplicationController
  before_action :authorize_request
  before_action :set_photo
  before_action :set_comment, only: [:update, :destroy, :show]

  def index
    @q = @photo.comments.ransack(params[:q])
    @comments = @q.result.paginate(page: params[:page], per_page: 10).all
    render layout: 'layouts/api'
  end

  def show
    render layout: 'layouts/api'
  end

  def create
    @comment = @photo.comments.new(comments_params)
    @comment.user = current_user
    @comment.create_date = Date.current

    if @comment.save
      @message = "Successfully created"
      render layout: 'layouts/api'
    else
      error_json_response @comment.errors.full_messages, :bad_request
    end
  end

  def update
    if @comment.update(comments_params)
      @message = "Successfully updated"
      render layout: 'layouts/api'
    else
      error_json_response @comment.errors.full_messages, :bad_request
    end
  end

  def destroy
    if @comment.destroy
      success_json_response({message: "Destroyed successfully."})
    else
      error_json_response @comment.errors.full_messages, :bad_request
    end
  end

  private

  def comments_params
    params.require(:comment).permit(:comment)
  end

  def set_photo
    @photo =  Photo.find(params[:photo_id])
  end

  def set_comment
    @comment =  @photo.comments.find(params[:id])
  end
end