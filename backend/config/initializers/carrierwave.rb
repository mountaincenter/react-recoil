CarrierWave.configure do |config|
  config.asset_host = "http://localhost"
  config.storage :file
  config.cache_storage = :file
end