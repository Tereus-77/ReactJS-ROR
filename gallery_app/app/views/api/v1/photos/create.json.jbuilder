json.photo do
  json.partial! @photo, locale: {photo: @photo}
end