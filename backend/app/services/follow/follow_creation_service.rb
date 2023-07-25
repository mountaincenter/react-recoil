# frozen_string_literal: true

module Follow
  #
  # follow creation service
  #
  class FollowCreationService
    def initialize(user, followed_user_id)
      @user = user
      @followed_user_id = followed_user_id
    end

    def create_follow
      follow = @user.following_relationships.build(following_id: @followed_user_id)

      if follow.save
        create_notification(follow)
        { status: :created, follow: }
      else
        { status: :unprocessable_entity, errors: follow.errors.full_messages }
      end
    end

    private

    def create_notification(follow)
      Notification.create!(
        user_id: @followed_user_id,
        notification_type: "follow",
        notifiable: follow,
        read: false
      )
    end
  end
end
