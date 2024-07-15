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
      Rails.logger.info "API key created: #{@api_key.inspect}"
      redirect_to admin_api_keys_path, notice: "API key created"
    else
      Rails.logger.error "Failed to create API key: #{@api_key.errors.full_messages.join(', ')}"
      @api_keys = ApiKey.all
      render :index
    end
  end

  def update
    authorize @api_key
    if @api_key.update(api_key_params)
      Rails.logger.info "API key updated: #{@api_key.inspect}"
      redirect_to admin_api_keys_path, notice: "API key updated"
    else 
      Rails.logger.error "Failed to update API key: #{@api_key.errors.full_messages.join(', ')}"
      @api_keys = ApiKey.all
      render :index
    end    
  end

  def destroy
    authorize @api_key
    @api_key.destroy
    Rails.logger.info "API key deleted: #{@api_key.inspect}"
    redirect_to admin_api_keys_path, notice: "API key deleted"
  end 

  private

  def admin_set_api_key 
    @api_key = ApiKey.find(params[:id])
  end

  def api_key_params
    params.require(:api_key).permit(:name, :otp_secret, :secret_key)
  end
end




















# # app/controllers/admin/api_keys_controller.rb
# class Admin::ApiKeysController < Admin::BaseController
#   before_action :require_admin
#   before_action :admin_set_api_key, only: [:update, :destroy]

#   def index
#     @api_keys = ApiKey.all
#     @api_key = ApiKey.new
#     authorize @api_keys
#   end

#   def create
#     @api_key = ApiKey.new(api_key_params)
#     authorize @api_key
#     if @api_key.save
#       set_environment_variables(@api_key)
#       redirect_to admin_api_keys_path, notice: "API key created"
#     else
#       @api_keys = ApiKey.all
#       render :index
#     end
#   end

#   def update
#     authorize @api_key
#     if @api_key.update(api_key_params)
#       set_environment_variables(@api_key)
#       redirect_to admin_api_keys_path, notice: "API key updated"
#     else 
#       @api_keys = ApiKey.all
#       render :index
#     end    
#   end

#   def destroy
#     authorize @api_key
#     @api_key.destroy
#     redirect_to admin_api_keys_path, notice: "API key deleted"
#   end 

#   private

#   def admin_set_api_key 
#     @api_key = ApiKey.find(params[:id])
#   end

#   def api_key_params
#     params.require(:api_key).permit(:name, :otp_secret, :secret_key)
#   end

#   def set_environment_variables(api_key)
#     ENV['OTP_SECRET'] = api_key.otp_secret
#     ENV['SECRET_KEY'] = api_key.secret_key
#     # Optionally, you can persist these variables to a file or another storage
#     # system if you need them to survive server restarts.
#   end
# end















# # app/controllers/admin/api_keys_controller.rb
# class Admin::ApiKeysController < Admin::BaseController
#   before_action :require_admin
#   before_action :admin_set_api_key, only: [:update, :destroy]

#   def index
#     @api_keys = ApiKey.all
#     @api_key = ApiKey.new
#     authorize @api_keys
#   end

#   def create
#     @api_key = ApiKey.new(api_key_params)
#     authorize @api_key
#     if @api_key.save
#       redirect_to admin_api_keys_path, notice: "API key created"
#     else
#       @api_keys = ApiKey.all
#       render :index
#     end
#   end

#   def update
#     authorize @api_key
#     if @api_key.update(api_key_params)
#       redirect_to admin_api_keys_path, notice: "API key updated"
#     else 
#       @api_keys = ApiKey.all
#       render :index
#     end    
#   end

#   def destroy
#     authorize @api_key
#     @api_key.destroy
#     redirect_to admin_api_keys_path, notice: "API key deleted"
#   end 

#   private

#   def admin_set_api_key 
#     @api_key = ApiKey.find(params[:id])
#   end

#   def api_key_params
#     params.require(:api_key).permit(:name, :otp_secret, :secret_key)
#   end
# end