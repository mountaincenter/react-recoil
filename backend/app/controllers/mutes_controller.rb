# frozen_string_literal: true

#
# mutes controller
#
class MutesController < ApplicationController
  before_create :set_user

  def create
    current_user.muted_users.create(mutee: @user)
    head :no_content
  end

  def destroy
    current_user.muted_users.find_by(mutee: @user).destroy!
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end
end
