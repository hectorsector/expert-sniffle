class ArrayProcessor
  def self.find_max(array)
    return nil if array.empty?
    array.max
  end

  def self.find_min(array)
    return nil if array.empty?
    array.min
  end

  def self.sum_array(array)
    array.sum
  end

  def self.average(array)
    return nil if array.empty?
    array.sum.to_f / array.length
  end

  def self.remove_duplicates(array)
    array.uniq
  end

  def self.sort_descending(array)
    array.sort.reverse
  end
end