ArSync.use :graph
ArSync.configure do |config|
  config.current_user_method = :current_user
  config.key_prefix = 'ar_sync_'
  config.key_secret = '58e9c7d67011cb520d9f4ca6f755ad4c'
  config.key_expires_in = 30.seconds
end
