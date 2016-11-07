module Users
  class AuthenticationController < ApplicationController
    JWTCredential = Struct.new(:payload, :header)

    def create
      if valid_credential?
        user = create_user

        sign_in user

        render json: {auth: true}
      else
        render json: {auth: false}
      end
    rescue Exception => e
      render json: {auth: false, error: e.message}
    end

    private

    def create_user
      User.find_by(user_params.slice(:email)).tap do |user|
        if user.blank?
          user = User.new
          user.password = Devise.friendly_token.first(12)
        end

        user.uid = user_params[:uid]
        user.name = user_params[:displayName]

        user.save
      end
    end

    def user_params
      @user_params ||= params.require(:user).permit(:uid, :displayName, :email)
    end

    def credential_params
      params.require(:credential).permit(:idToken)
    end

    def credential_data
      @credential_data ||= begin
        id_token = credential_params.fetch(:idToken)

        decoded_data = JWT.decode(id_token, nil, false)

        JWTCredential.new(*decoded_data)
      end
    end

    def valid_credential?
      credential_data.payload.fetch("email") == user_params[:email]
    end
  end
end
