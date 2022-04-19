require 'rails_helper'

RSpec.describe BlacklistedToken, type: :model do
  it { should belong_to(:user) }
end