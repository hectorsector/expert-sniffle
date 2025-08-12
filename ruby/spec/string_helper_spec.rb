require_relative '../lib/string_helper'

RSpec.describe StringHelper do
  describe '.reverse_string' do
    it 'reverses a simple string' do
      expect(StringHelper.reverse_string('hello')).to eq('olleh')
    end

    it 'reverses an empty string' do
      expect(StringHelper.reverse_string('')).to eq('')
    end

    it 'reverses a string with spaces' do
      expect(StringHelper.reverse_string('hello world')).to eq('dlrow olleh')
    end
  end

  describe '.capitalize_words' do
    it 'capitalizes each word' do
      expect(StringHelper.capitalize_words('hello world')).to eq('Hello World')
    end

    it 'handles single word' do
      expect(StringHelper.capitalize_words('hello')).to eq('Hello')
    end

    it 'handles empty string' do
      expect(StringHelper.capitalize_words('')).to eq('')
    end
  end

  describe '.count_vowels' do
    it 'counts vowels in a string' do
      expect(StringHelper.count_vowels('hello')).to eq(2)
    end

    it 'counts vowels case insensitively' do
      expect(StringHelper.count_vowels('AEIOU')).to eq(5)
    end

    it 'returns zero for string with no vowels' do
      expect(StringHelper.count_vowels('xyz')).to eq(0)
    end
  end

  describe '.is_palindrome?' do
    it 'identifies simple palindrome' do
      expect(StringHelper.is_palindrome?('racecar')).to be true
    end

    it 'identifies palindrome with spaces and punctuation' do
      expect(StringHelper.is_palindrome?('A man, a plan, a canal: Panama')).to be true
    end

    it 'identifies non-palindrome' do
      expect(StringHelper.is_palindrome?('hello')).to be false
    end
  end
end