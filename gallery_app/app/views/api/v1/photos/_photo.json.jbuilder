json.id photo.id
json.name photo.name
json.description photo.description
json.shooting_date photo.shooting_date
json.image photo.image.attached? ? photo.image.service_url : nil