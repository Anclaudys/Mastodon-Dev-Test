# == Schema Information
#
# Table name: api_keys
#
#  id          :bigint(8)        not null, primary key
#  key         :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  name        :string
#  otp_key     :string
#  secret_key  :string
#
class ApiKey < ApplicationRecord
end
