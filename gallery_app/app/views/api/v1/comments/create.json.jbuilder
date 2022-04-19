json.comment do
  json.partial! @comment, locale: {comment: @comment}
end