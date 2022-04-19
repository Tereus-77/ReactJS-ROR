# frozen_string_literal: true

require 'rails_helper'


RSpec.describe "Users", type: :request do

  let(:user) { User.create(email: "test@gmail.com", password: "password") }

  describe 'GET #index' do

    before(:each) do
      get api_v1_users_path, headers: {Authorization: "Bearer #{confirm_and_login_user(user)}"}, as: :json
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
      get api_v1_user_path(user), headers: {Authorization: "Bearer #{confirm_and_login_user(user)}"}, as: :json
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
      post api_v1_users_path, params: {user: {email: "testone@gmail.com",
                                                     password: "password"}},
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
      put api_v1_user_path(user), params: {user: {first_name: "test one"}},
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
      delete api_v1_user_path(user),
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