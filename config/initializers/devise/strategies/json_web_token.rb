module Devise
  module Strategies
    class JsonWebToken < Base
      BEARER = 'bearer'

      def valid?
        request.headers['Authorization'].present?
      end

      def authenticate!
        return fail! unless claims
        return fail! unless claims.has_key?('user_id')

        success! User.find_by(id: claims['user_id'])
      end

      protected

      def claims
        strategy, token = request.headers['Authorization'].split(' ')

        return nil if String(strategy).downcase != BEARER

        JWTWrapper.decode(token) rescue nil
      end
    end
  end
end
