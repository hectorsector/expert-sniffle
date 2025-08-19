class StringHelper
  def self.reverse_string(str)
    str.reverse
  end

  def self.capitalize_words(str)
    str.split(' ').map(&:capitalize).join(' ')
  end

  def self.count_vowels(str)
    str.downcase.count('aeiou')
  end

  def self.is_palindrome?(str)
    clean_str = str.downcase.gsub(/[^a-z0-9]/, '')
    clean_str == clean_str.reverse
  end
end