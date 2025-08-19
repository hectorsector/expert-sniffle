class User
  attr_reader :name, :email, :age

  def initialize(name, email, age)
    @name = name
    @email = email
    @age = age
  end

  def adult?
    @age >= 18
  end

  def valid_email?
    @email.match?(/\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i)
  end

  def greet
    "Hello, I'm #{@name}!"
  end

  def can_vote?
    @age >= 18
  end
end