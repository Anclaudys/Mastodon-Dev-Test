# app/controllers/admin/settings/administration_controller.rb
# app/controllers/admin/settings/administration_controller.rb
# frozen_string_literal: true

module Admin
  module Settings
    class AdministrationController < Admin::SettingsController
      def show
        # No specific authorization needed for now - just render the page
      end
    end
  end
end