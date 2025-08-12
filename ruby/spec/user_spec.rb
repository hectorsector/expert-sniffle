require_relative '../lib/user'

RSpec.describe User do
  let(:adult_user) { User.new("John Doe", "john@example.com", 25) }
  let(:minor_user) { User.new("Jane Doe", "jane@example.com", 16) }
  let(:invalid_email_user) { User.new("Bob", "invalid-email", 30) }

  describe '#initialize' do
    it 'sets user attributes correctly' do
      expect(adult_user.name).to eq("John Doe")
      expect(adult_user.email).to eq("john@example.com")
      expect(adult_user.age).to eq(25)
    end
  end

  describe '#adult?' do
    it 'returns true for users 18 and older' do
      expect(adult_user.adult?).to be true
    end

    it 'returns false for users under 18' do
      expect(minor_user.adult?).to be false
    end
  end

  describe '#valid_email?' do
    it 'returns true for valid email' do
      expect(adult_user.valid_email?).to be true
    end

    it 'returns false for invalid email' do
      expect(invalid_email_user.valid_email?).to be false
    end
  end

  describe '#greet' do
    it 'returns personalized greeting' do
      expect(adult_user.greet).to eq("Hello, I'm John Doe!")
    end
  end

  describe '#can_vote?' do
    it 'returns true for adults' do
      expect(adult_user.can_vote?).to be true
    end

    it 'returns false for minors' do
      expect(minor_user.can_vote?).to be false
    end
  end
end