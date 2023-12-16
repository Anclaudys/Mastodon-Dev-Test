# frozen_string_literal: true

class Settings::VerificationsController < Settings::BaseController
  before_action :set_account

  def show
    @verified_links = @account.fields.select(&:verified?)

    truanon_service = TruAnonService.new(@account)
    truanon_service.verify_user

    @verify_url = truanon_service.get_verify_url
    @public_profile_url = truanon_service.get_public_profile_url

  end

  def update
    if UpdateAccountService.new.call(@account, account_params.except(:settings))
      current_user.update!(settings_attributes: account_params[:settings])
      ActivityPub::UpdateDistributionWorker.perform_async(@account.id)
      redirect_to settings_verification_path, notice: I18n.t('generic.changes_saved_msg')
    else
      render :show
    end
  end

  def load_user_settings
    @user = User.find_by(username: params[:username])
    @user_settings = @user&.settings
  end

  private

  def account_params
    params.require(:account).permit(:discoverable, :unlocked, :indexable, :show_collections, settings: UserSettings.keys)
  end

  def set_account
    @account = current_account
  end

end
