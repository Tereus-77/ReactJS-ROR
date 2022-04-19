json.user do
  json.partial! @user, locale: {user: @user}
end