require 'rails_helper'

RSpec.describe Tag, type: :model do
  it { should validate_uniqueness_of(:name) }
end