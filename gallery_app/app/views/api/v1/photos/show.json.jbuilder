json.photo do
  json.partial! @photo, locale: {photo: @photo}
end

json.tags do
  json.partial! partial: 'api/v1/tags/tag', as: :tag, collection: @photo.tags
end