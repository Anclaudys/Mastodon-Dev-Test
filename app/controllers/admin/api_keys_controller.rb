# app/controllers/admin/api_keys_controller.rb
class Admin::ApiKeysController < Admin::BaseController
  before_action :require_admin
  before_action :admin_set_api_key, only: [:update, :destroy]

  def index
    @api_keys = ApiKey.all
    @api_key = ApiKey.new
    authorize @api_keys
  end

  def create
    @api_key = ApiKey.new(api_key_params)
    authorize @api_key
    if @api_key.save
      redirect_to admin_api_keys_path, notice: "API key created"
    else
      @api_keys = ApiKey.all
      render :index
    end
  end

  def update
    authorize @api_key
    if @api_key.update(api_key_params)
      redirect_to admin_api_keys_path, notice: "API key updated"
    else 
      @api_keys = ApiKey.all
      render :index
    end    
  end

  def destroy
    authorize @api_key
    @api_key.destroy
    redirect_to admin_api_keys_path, notice: "API key deleted"
  end 

  private

  def admin_set_api_key 
    @api_key = ApiKey.find(params[:id])
  end

  def api_key_params
    params.require(:api_key).permit(:name, :otp_key, :secret_key)
  end
end