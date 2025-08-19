class WeatherForecast
  attr_reader :city, :temperature, :conditions

  def initialize(city, temperature, conditions)
    @city = city
    @temperature = temperature
    @conditions = conditions
  end

  def celsius_to_fahrenheit
    (@temperature * 9.0 / 5.0) + 32
  end

  def fahrenheit_to_celsius
    (@temperature - 32) * 5.0 / 9.0
  end

  def is_freezing?
    @temperature <= 0
  end

  def is_hot?
    @temperature >= 30
  end

  def weather_report
    "Weather in #{@city}: #{@temperature}°C, #{@conditions}"
  end

  def suitable_for_outdoor_activities?
    @temperature > 10 && !['rain', 'storm', 'snow'].include?(@conditions.downcase)
  end
end