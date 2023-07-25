# frozen_string_literal: true

module Auth
  #
  # registrations controller
  #
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    private

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name, :username, :avatar)
    end
  end
end
