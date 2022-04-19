class Api::V1::GalleriesController < ApplicationController

  before_action :authorize_request
  before_action :set_gallery, only: [:update, :destroy, :show]

  def index
    @q = current_user.galleries.ransack(params[:q])
    @galleries = @q.result.paginate(page: params[:page], per_page: 10).all
    render layout: 'layouts/api'
  end

  def show
    render layout: 'layouts/api'
  end

  def create
    @gallery = current_user.galleries.new(galleries_params)

    if @gallery.save
      @message = "Successfully created"
      render layout: 'layouts/api'
    else
      error_json_response @gallery.errors.full_messages, :bad_request
    end
  end

  def update
    if @gallery.update(galleries_params)
      @message = "Successfully updated"
      render layout: 'layouts/api'
    else
      error_json_response @gallery.errors.full_messages, :bad_request
    end
  end

  def destroy
    if @gallery.destroy
      success_json_response({message: "Destroyed successfully."})
    else
      error_json_response @gallery.errors.full_messages, :bad_request
    end
  end

  private

  def galleries_params
    params.require(:gallery).permit(:name, :description)
  end

  def set_gallery
    @gallery =  current_user.galleries.find(params[:id])
  end
end