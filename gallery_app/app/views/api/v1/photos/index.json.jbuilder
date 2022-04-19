json.photos do
  json.partial! partial: 'api/v1/photos/photo', as: :photo, collection: @photos
end

json.total_pages @photos.total_pages