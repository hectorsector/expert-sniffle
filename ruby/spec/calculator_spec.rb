require_relative '../lib/calculator'

RSpec.describe Calculator do
  let(:calculator) { Calculator.new }

  describe '#add' do
    it 'adds two positive numbers' do
      expect(calculator.add(2, 3)).to eq(5)
    end

    it 'adds negative numbers' do
      expect(calculator.add(-2, -3)).to eq(-5)
    end

    it 'adds positive and negative numbers' do
      expect(calculator.add(5, -3)).to eq(2)
    end
  end

  describe '#subtract' do
    it 'subtracts two positive numbers' do
      expect(calculator.subtract(5, 3)).to eq(2)
    end

    it 'subtracts negative numbers' do
      expect(calculator.subtract(-2, -3)).to eq(1)
    end
  end

  describe '#multiply' do
    it 'multiplies two positive numbers' do
      expect(calculator.multiply(3, 4)).to eq(12)
    end

    it 'multiplies by zero' do
      expect(calculator.multiply(5, 0)).to eq(0)
    end
  end

  describe '#divide' do
    it 'divides two positive numbers' do
      expect(calculator.divide(10, 2)).to eq(5.0)
    end

    it 'raises error when dividing by zero' do
      expect { calculator.divide(10, 0) }.to raise_error(ArgumentError, "Cannot divide by zero")
    end
  end
end