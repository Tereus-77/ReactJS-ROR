json.gallery do
  json.partial! @gallery, locale: {gallery: @gallery}
end

json.tags do
  json.partial! partial: 'api/v1/tags/tag', as: :tag, collection: @gallery.tags
end