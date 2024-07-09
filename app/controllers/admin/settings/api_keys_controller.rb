class Admin::Settings::ApiKeysController < Admin::BaseController
  before_action :require_admin!

  def index
    @api_keys = ApiKey.all
    @api_key = ApiKey.new
  end

  def create
    @api_key = ApiKey.new(api_key_params)
    if @api_key.save
      redirect_to admin_settings_api_keys_path, notice: "API key created"
    else
      @api_keys = ApiKey.all
      render :index
    end
  end

  def update
    if @api_key = ApiKey.find(params[:id])
      redirect_to admin_settings_api_keys_path, notice: "API key updated"
    else 
      @api_keys = Api.all
      render :index
    end    
  end

  def destroy
    @api_key.destroy
    redirect_to admin_settings_api_keys_path, notice: "API key deleted"
  end 

  private

  def admin_set_api_key 
    @api_key = ApiKey.find(params[:id])
  end

  def api_key_params
    params.require(:api_key).permit(:key, :description)
  end
end