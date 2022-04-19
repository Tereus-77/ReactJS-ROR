json.data do
  json.merge! JSON.parse(yield)
  json.message @message if @message
end
json.status @errors.present? ? "error" : "success"
json.errors @errors || []