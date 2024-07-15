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
      set_environment_variables(@api_key)
      redirect_to admin_api_keys_path, notice: "API key created"
    else
      @api_keys = ApiKey.all
      render :index
    end
  end

  def update
    authorize @api_key
    if @api_key.update(api_key_params)
      set_environment_variables(@api_key)
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
    params.require(:api_key).permit(:name, :otp_secret, :secret_key)
  end

  def set_environment_variables(api_key)
    Rails.logger.info "Updating .env file..."
    env_file = Rails.root.join('.env')
    existing_lines = File.exist?(env_file) ? File.read(env_file).split("\n") : []
    filtered_lines = existing_lines.reject { |line| line.start_with?("OTP_SECRET=", "SECRET_KEY=") }
    new_lines = [
      "OTP_SECRET=#{api_key.otp_secret}",
      "SECRET_KEY=#{api_key.secret_key}"
    ]
    Rails.logger.info "New lines: #{new_lines}"
    new_content = (filtered_lines + new_lines).join("\n")
    File.open(env_file, 'w') { |file| file.puts new_content }
    Dotenv.load(env_file)
    updated_file = File.read(env_file)
    Rails.logger.info "Updated file: #{updated_file}"
  end  
end
