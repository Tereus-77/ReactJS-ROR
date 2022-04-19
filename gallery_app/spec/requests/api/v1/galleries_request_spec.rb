# frozen_string_literal: true

require 'rails_helper'


RSpec.describe "Galleries", type: :request do

  let(:user) { User.create(email: "test@gmail.com", password: "password") }

  let(:gallery) { Gallery.create(name: "test", description: "test", user_id: user.id) }


  describe 'GET #index' do

    before(:each) do
      get api_v1_galleries_path, headers: {Authorization: "Bearer #{confirm_and_login_user(user)}"}, as: :json
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns a rendered template format' do
      expect(response.content_type).to eq 'application/json'
      expect(response).to render_template('index')
    end
  end

  describe 'GET #show' do

    before(:each) do
      get api_v1_gallery_path(gallery), headers: {Authorization: "Bearer #{confirm_and_login_user(user)}"}, as: :json
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns a rendered template format' do
      expect(response.content_type).to eq 'application/json'
      expect(response).to render_template('show')
    end
  end

  describe 'POST #create' do

    before(:each) do
      post api_v1_galleries_path, params: {gallery: {name: "test", user_id: user.id,
                                                    description: "test"}},
           headers: {Authorization: "Bearer #{confirm_and_login_user(user)}"}, as: :json
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns a rendered template format' do
      expect(response.content_type).to eq 'application/json'
      expect(response).to render_template('create')
    end
  end

  describe 'PUT #update' do

    before(:each) do
      put api_v1_gallery_path(gallery), params: {gallery: {name: "test one"}},
          headers: {Authorization: "Bearer #{confirm_and_login_user(user)}"}, as: :json
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns a rendered template format' do
      expect(response.content_type).to eq 'application/json'
      expect(response).to render_template('update')
    end
  end

  describe 'DELETE #destroy' do

    before(:each) do
      delete api_v1_gallery_path(gallery),
             headers: {Authorization: "Bearer #{confirm_and_login_user(user)}"}, as: :json
    end

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns a rendered template and return a message' do
      expect(response.content_type).to eq 'application/json'
      expect(JSON.parse(response.body)['data']['message']).to eq('Destroyed successfully.')
    end
  end

end