module Users
  class SessionsController < Devise::SessionsController
    after_action :set_csrf_headers, only: [:create, :destroy]

    respond_to :json

    def create
      fail NotImplementedError
    end

    protected

    def set_csrf_headers
      if request.xhr?
        response.headers['X-CSRF-Param'] = request_forgery_protection_token
        response.headers['X-CSRF-Token'] = form_authenticity_token
      end
    end
  end
end
