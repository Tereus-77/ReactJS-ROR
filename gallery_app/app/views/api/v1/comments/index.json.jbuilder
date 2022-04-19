json.comments do
  json.partial! partial: 'api/v1/comments/comment', as: :comment, collection: @comments
end