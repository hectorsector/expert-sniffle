require_relative '../lib/weather_forecast'

RSpec.describe WeatherForecast do
  let(:sunny_weather) { WeatherForecast.new("New York", 25, "Sunny") }
  let(:cold_weather) { WeatherForecast.new("Alaska", -5, "Snow") }
  let(:hot_weather) { WeatherForecast.new("Phoenix", 35, "Clear") }
  let(:rainy_weather) { WeatherForecast.new("Seattle", 15, "Rain") }

  describe '#initialize' do
    it 'sets weather attributes correctly' do
      expect(sunny_weather.city).to eq("New York")
      expect(sunny_weather.temperature).to eq(25)
      expect(sunny_weather.conditions).to eq("Sunny")
    end
  end

  describe '#celsius_to_fahrenheit' do
    it 'converts celsius to fahrenheit correctly' do
      expect(sunny_weather.celsius_to_fahrenheit).to eq(77.0)
    end

    it 'converts freezing point correctly' do
      freezing = WeatherForecast.new("Test", 0, "Cold")
      expect(freezing.celsius_to_fahrenheit).to eq(32.0)
    end
  end

  describe '#fahrenheit_to_celsius' do
    it 'converts fahrenheit to celsius correctly' do
      fahrenheit_weather = WeatherForecast.new("Test", 77, "Warm")
      expect(fahrenheit_weather.fahrenheit_to_celsius).to eq(25.0)
    end
  end

  describe '#is_freezing?' do
    it 'returns true for temperatures at or below freezing' do
      expect(cold_weather.is_freezing?).to be true
    end

    it 'returns false for temperatures above freezing' do
      expect(sunny_weather.is_freezing?).to be false
    end
  end

  describe '#is_hot?' do
    it 'returns true for temperatures 30 degrees and above' do
      expect(hot_weather.is_hot?).to be true
    end

    it 'returns false for temperatures below 30 degrees' do
      expect(sunny_weather.is_hot?).to be false
    end
  end

  describe '#weather_report' do
    it 'returns formatted weather report' do
      expect(sunny_weather.weather_report).to eq("Weather in New York: 25°C, Sunny")
    end
  end

  describe '#suitable_for_outdoor_activities?' do
    it 'returns true for good weather conditions' do
      expect(sunny_weather.suitable_for_outdoor_activities?).to be true
    end

    it 'returns false for rainy conditions' do
      expect(rainy_weather.suitable_for_outdoor_activities?).to be false
    end

    it 'returns false for cold temperatures' do
      expect(cold_weather.suitable_for_outdoor_activities?).to be false
    end
  end
end