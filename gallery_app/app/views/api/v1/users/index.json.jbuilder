json.users do
  json.partial! partial: 'api/v1/users/user', as: :user, collection: @users
end