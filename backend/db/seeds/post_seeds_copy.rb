# frozen_string_literal: true

image_paths = ["app/assets/images/cat01.png", "app/assets/images/cat02.png", "app/assets/images/cat03.png"]

unless Post.exists?
  User.find_each do |user|
    number_of_images = user.id % 3 + 1
    images = number_of_images.times.map { |i| File.open(image_paths[i]) }

    mention = Random.rand(0..3) == 1 ? "@testuser1 " : "" # 25%の確率でメンションを追加
    hashtag = Faker::Address.city.gsub(" ", "_")
    content_with_mention_and_hashtag = "#{mention}#{Faker::Lorem.paragraph} ##{hashtag}"

    post_params = {
      content: content_with_mention_and_hashtag,
      images:
    }

    post_service = Posts::PostService.new(user, post_params)
    post = post_service.create_post

    users_for_likes = User.order(Arel.sql("RAND()")).limit(Random.rand(0..5))
    users_for_likes.each do |like_user|
      Like.create!(user_id: like_user.id, post_id: post.id) unless Like.exists?(user_id: like_user.id, post_id: post.id)
    end
  end

  testuser1 = User.find_by(username: "testuser1")
  if testuser1
    testuser1.posts.order(created_at: :desc).each do |post|
      Random.rand(0..1).times do
        Faker::Config.locale = "ja"
        reply_hashtag = Faker::Address.city.gsub(" ", "_")
        reply_content_with_hashtag = "#{Faker::Lorem.paragraph} ##{reply_hashtag}"
        Faker::Config.locale = nil

        reply_params = {
          content: reply_content_with_hashtag
        }

        reply_user = User.order(Arel.sql("RAND()")).first # Random user will make the reply

        post = Posts::ReplyService.new(reply_user, reply_params, post.id).create_post

        users_for_likes = User.order(Arel.sql("RAND()")).limit(Random.rand(0..5))
        users_for_likes.each do |like_user|
          Like.create!(user_id: like_user.id, post_id: post.id) unless Like.exists?(user_id: like_user.id, post_id: post.id)
        end
      end

      # Create reposts
      Random.rand(0..5).times do
        repost_user = User.order(Arel.sql("RAND()")).first # Random user will make the repost

        repost_params = {
          content: nil, # Reposts don't have their own content
          post_type: "repost"
        }

        Posts::RepostService.new(repost_user, repost_params, post.id).create_post
      end

      # Create quote reposts
      Random.rand(0..5).times do
        quote_repost_user = User.order(Arel.sql("RAND()")).first # Random user will make the quote repost

        quote_repost_params = {
          content: Faker::Lorem.paragraph,  # Quote reposts have their own content
          post_type: "quote_repost"
        }

        Posts::QuoteRepostService.new(quote_repost_user, quote_repost_params, post.id).create_post
      end
    end
  end
  posts = Post.order(Arel.sql("RAND()")).limit(15)
  posts.each do |post|
    Bookmark.create!(user: testuser1, post:) unless Bookmark.exists?
  end
end
