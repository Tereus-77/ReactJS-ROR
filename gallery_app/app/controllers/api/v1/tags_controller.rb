class Api::V1::TagsController < ApplicationController

  before_action :authorize_request
  before_action :set_tag, only: [:update, :destroy, :show]

  def index
    @tags = if params[:gallery_id].present?
              Gallery.find(params[:gallery_id]).tags
            else
              Photo.find(params[:photo_id]).tags
            end
  end

  def show
    @galleries = Gallery.joins(:tags).where(tags: { id: @tag.id })
    @photos = Photo.joins(:tags).where(tags: { id: @tag.id })
    render layout: 'layouts/api'
  end

  def create
    @tag = Tag.find_by(name: tags_params[:name])
    if @tag.nil?
      @tag = Tag.new(tags_params)

      if @tag.save
        if params[:gallery_id].present?
          Gallery.find(params[:gallery_id]).tags << @tag unless Gallery.find(params[:gallery_id]).tags.include?(@tag)
        else
          Photo.find(params[:photo_id]).tags << @tag unless Photo.find(params[:photo_id]).tags.include?(@tag)
        end
        @message = "Successfully created"
        render layout: 'layouts/api'
      else
        error_json_response @tag.errors.full_messages, :bad_request
      end
    else
      if params[:gallery_id].present?
        Gallery.find(params[:gallery_id]).tags << @tag unless Gallery.find(params[:gallery_id]).tags.include?(@tag)
      else
        Photo.find(params[:photo_id]).tags << @tag unless Photo.find(params[:photo_id]).tags.include?(@tag)
      end
    end
  end

  def update
    if @tag.update(tags_params)
      @message = "Successfully updated"
      render layout: 'layouts/api'
    else
      error_json_response @tag.errors.full_messages, :bad_request
    end
  end

  def destroy
    if @tag.destroy
      success_json_response({ message: "Destroyed successfully." })
    else
      error_json_response @tag.errors.full_messages, :bad_request
    end
  end

  private

  def tags_params
    params.require(:tag).permit(:name)
  end

  def set_tag
    @tag = Tag.find(params[:id])
  end
end