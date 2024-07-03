require 'rails_helper'

RSpec.describe "Admin::Settings::ApiKeys", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/admin/settings/api_keys/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/admin/settings/api_keys/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/admin/settings/api_keys/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/admin/settings/api_keys/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
