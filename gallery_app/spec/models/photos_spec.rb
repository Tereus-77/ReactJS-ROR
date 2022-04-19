require 'rails_helper'

RSpec.describe Photo, type: :model do
  it { should have_many(:comments) }
  it { should belong_to(:gallery) }
  it { should have_one_attached(:image) }
  it { should have_and_belong_to_many(:tags) }
  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name) }
end