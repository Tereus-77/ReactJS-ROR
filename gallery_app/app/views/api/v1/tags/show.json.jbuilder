json.tag do
  json.partial! @tag, locale: {tag: @tag}
end

json.galleries do
  json.partial! partial: 'api/v1/galleries/gallery', as: :gallery, collection: @galleries
end

json.photos do
  json.partial! partial: 'api/v1/photos/photo', as: :photo, collection: @photos
end