require 'rails_helper'

RSpec.describe Gallery, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:photos) }
  it { should have_and_belong_to_many(:tags) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:description) }
  it { should validate_uniqueness_of(:name) }
end