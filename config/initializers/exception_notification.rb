RequestsTracker::Application.config.middleware.use(
  ExceptionNotifier,
  :email_prefix => "[RequestsTracker] ",
  :sender_address => APP_CONFIG[:admin_email],
  :exception_recipients => [APP_CONFIG[:admin_email]]
)
