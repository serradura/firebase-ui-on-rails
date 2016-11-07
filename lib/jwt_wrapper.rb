module JWTWrapper
  extend self

  def encode(payload, expiration = nil)
    secrets = Rails.application.secrets

    expiration ||= secrets.jwt_expiration_minutes.to_i.minutes

    payload = payload.dup
    payload['exp'] = expiration.from_now.to_i

    JWT.encode payload, secrets.jwt_secret
  end

  def decode!(token)
    decoded_token = JWT.decode token, Rails.application.secrets.jwt_secret

    decoded_token.first
  end

  def decode(token)
    decode!(token)
  rescue
    nil
  end
end
