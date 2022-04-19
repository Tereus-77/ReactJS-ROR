json.tags do
  json.partial! partial: 'api/v1/tags/tag', as: :tag, collection: @tags
end