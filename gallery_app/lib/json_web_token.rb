class JsonWebToken
  SECRET_KEY = "b2679910db8473e390dcf2e911cb8caf291836ddcf4bbbcd20d4993bf15f296784e296dfb3a3e1cd1b8e18ac95f05c1a762b0a4ac25d4223d44a24f5632cff9e"

  def self.expiry_time
    24.hours.from_now
  end

  def self.refresh_expiry_time
    3.days.from_now
  end

  def self.encode(payload, expiration = self.expiry_time )

    payload[:exp] = expiration.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  end
end