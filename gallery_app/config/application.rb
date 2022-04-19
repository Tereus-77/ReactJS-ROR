require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GalleryApp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    #CORS CONFIG
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*',
        :headers => :any,
        :methods => [:get, :post, :delete, :put, :patch, :head, :options]
      end
      # ALLOWED_CLIENTS = %i[localhost:3000 localhost:5000
      #  lit-waters-81085.herokuapp.com nameless-refuge-83744.herokuapp.com] + [ENV['CORS_CLIENTS']&.split(',')]

      # ALLOWED_CLIENTS.compact.each do |client|
      #   allow do
      #     origins client
      #     resource '*',
      #              headers: :any,
      #              credentials: true,
      #              methods: :any
      #   end
      # end
    end

    config.eager_load_paths << Rails.root.join('lib')

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
