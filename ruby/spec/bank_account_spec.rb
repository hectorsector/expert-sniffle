require_relative '../lib/bank_account'

RSpec.describe BankAccount do
  let(:account) { BankAccount.new("12345", 100) }
  let(:target_account) { BankAccount.new("67890", 50) }

  describe '#initialize' do
    it 'creates account with initial balance' do
      expect(account.balance).to eq(100)
      expect(account.account_number).to eq("12345")
    end

    it 'creates account with zero balance by default' do
      new_account = BankAccount.new("11111")
      expect(new_account.balance).to eq(0)
    end
  end

  describe '#deposit' do
    it 'increases balance by deposit amount' do
      account.deposit(50)
      expect(account.balance).to eq(150)
    end

    it 'raises error for negative amount' do
      expect { account.deposit(-10) }.to raise_error(ArgumentError, "Amount must be positive")
    end

    it 'raises error for zero amount' do
      expect { account.deposit(0) }.to raise_error(ArgumentError, "Amount must be positive")
    end
  end

  describe '#withdraw' do
    it 'decreases balance by withdrawal amount' do
      account.withdraw(30)
      expect(account.balance).to eq(70)
    end

    it 'raises error for insufficient funds' do
      expect { account.withdraw(200) }.to raise_error(ArgumentError, "Insufficient funds")
    end

    it 'raises error for negative amount' do
      expect { account.withdraw(-10) }.to raise_error(ArgumentError, "Amount must be positive")
    end
  end

  describe '#transfer' do
    it 'transfers money between accounts' do
      account.transfer(25, target_account)
      expect(account.balance).to eq(75)
      expect(target_account.balance).to eq(75)
    end

    it 'raises error for insufficient funds' do
      expect { account.transfer(200, target_account) }.to raise_error(ArgumentError, "Insufficient funds")
    end
  end

  describe '#account_summary' do
    it 'returns formatted account information' do
      expect(account.account_summary).to eq("Account 12345: $100")
    end
  end
end