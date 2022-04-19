json.galleries do
  json.partial! partial: 'api/v1/galleries/gallery', as: :gallery, collection: @galleries
end

json.total_pages @galleries.total_pages