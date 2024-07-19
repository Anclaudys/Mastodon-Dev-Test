
class ApiKey < ApplicationRecord
  validates :private_key, presence: true
end
