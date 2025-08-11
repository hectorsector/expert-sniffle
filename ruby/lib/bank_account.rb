class BankAccount
  attr_reader :balance, :account_number

  def initialize(account_number, initial_balance = 0)
    @account_number = account_number
    @balance = initial_balance
  end

  def deposit(amount)
    raise ArgumentError, "Amount must be positive" if amount <= 0
    @balance += amount
  end

  def withdraw(amount)
    raise ArgumentError, "Amount must be positive" if amount <= 0
    raise ArgumentError, "Insufficient funds" if amount > @balance
    @balance -= amount
  end

  def transfer(amount, target_account)
    withdraw(amount)
    target_account.deposit(amount)
  end

  def account_summary
    "Account #{@account_number}: $#{@balance}"
  end
end