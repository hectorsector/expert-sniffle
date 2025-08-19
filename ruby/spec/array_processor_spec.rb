require_relative '../lib/array_processor'

RSpec.describe ArrayProcessor do
  describe '.find_max' do
    it 'finds maximum in positive numbers' do
      expect(ArrayProcessor.find_max([1, 5, 3, 9, 2])).to eq(9)
    end

    it 'finds maximum in negative numbers' do
      expect(ArrayProcessor.find_max([-1, -5, -3, -2])).to eq(-1)
    end

    it 'returns nil for empty array' do
      expect(ArrayProcessor.find_max([])).to be_nil
    end
  end

  describe '.find_min' do
    it 'finds minimum in positive numbers' do
      expect(ArrayProcessor.find_min([1, 5, 3, 9, 2])).to eq(1)
    end

    it 'finds minimum in mixed numbers' do
      expect(ArrayProcessor.find_min([1, -5, 3, 9, 2])).to eq(-5)
    end

    it 'returns nil for empty array' do
      expect(ArrayProcessor.find_min([])).to be_nil
    end
  end

  describe '.sum_array' do
    it 'sums positive numbers' do
      expect(ArrayProcessor.sum_array([1, 2, 3, 4])).to eq(10)
    end

    it 'sums empty array to zero' do
      expect(ArrayProcessor.sum_array([])).to eq(0)
    end
  end

  describe '.average' do
    it 'calculates average of numbers' do
      expect(ArrayProcessor.average([2, 4, 6])).to eq(4.0)
    end

    it 'returns nil for empty array' do
      expect(ArrayProcessor.average([])).to be_nil
    end
  end

  describe '.remove_duplicates' do
    it 'removes duplicate values' do
      expect(ArrayProcessor.remove_duplicates([1, 2, 2, 3, 3, 3])).to eq([1, 2, 3])
    end

    it 'handles array with no duplicates' do
      expect(ArrayProcessor.remove_duplicates([1, 2, 3])).to eq([1, 2, 3])
    end
  end

  describe '.sort_descending' do
    it 'sorts array in descending order' do
      expect(ArrayProcessor.sort_descending([3, 1, 4, 1, 5])).to eq([5, 4, 3, 1, 1])
    end

    it 'handles empty array' do
      expect(ArrayProcessor.sort_descending([])).to eq([])
    end
  end
end