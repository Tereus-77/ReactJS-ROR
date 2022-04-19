require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:blacklisted_tokens) }
  it { should have_many(:refresh_tokens) }
  it { should have_many(:comments) }
  it { should have_many(:galleries) }
end