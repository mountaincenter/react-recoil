# frozen_string_literal: true

class BookmarksController < ApplicationController
  def create
    bookmark = current_user.bookmarks.build(post_id: params[:post_id])
    if bookmark.save!
      render json: bookmark, status: :created
    else
      render json: { errors: bookmark.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    bookmark = Bookmark.find_by!(post_id: params[:post_id], user_id: current_user.id)
    bookmark.destroy!
    head :no_content
  end
end
