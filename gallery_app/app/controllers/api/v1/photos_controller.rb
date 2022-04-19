class Api::V1::PhotosController < ApplicationController
  before_action :authorize_request
  before_action :set_gallery
  before_action :set_photo, only: [:update, :destroy, :show]

  def index
    @q = @gallery.photos.ransack(params[:q])
    @photos = @q.result.paginate(page: params[:page], per_page: 10).all
    render layout: 'layouts/api'
  end

  def show
    render layout: 'layouts/api'
  end

  def create
    @photo = @gallery.photos.new(name: params[:name], description: params[:description], image: params[:image], shooting_date: params[:shooting_date])

    if @photo.save
      @message = "Successfully created"
      render layout: 'layouts/api'
    else
      error_json_response @photo.errors.full_messages, :bad_request
    end
  end

  def update
    if @photo.update(name: params[:name], description: params[:description], image: params[:image], shooting_date: params[:shooting_date])
      @message = "Successfully updated"
      render layout: 'layouts/api'
    else
      error_json_response @photo.errors.full_messages, :bad_request
    end
  end

  def destroy
    if @photo.destroy
      success_json_response({message: "Destroyed successfully."})
    else
      error_json_response @photo.errors.full_messages, :bad_request
    end
  end

  private

  def set_gallery
    @gallery =  current_user.galleries.find(params[:gallery_id])
  end

  def set_photo
    @photo =  @gallery.photos.find(params[:id])
  end
end