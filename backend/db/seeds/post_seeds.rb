unless Post.exists?
  image_paths = ["app/assets/images/cat01.png", "app/assets/images/cat02.png", "app/assets/images/cat03.png"]

  User.find_each do |user|
    number_of_images = user.id % 3 + 1
    images = number_of_images.times.map { |i| File.open(image_paths[i]) }

    # mentioned_user = User.order(Arel.sql('RAND()')).first
    # mention = Random.rand(0..1) == 1 ? "@#{mentioned_user.username} " : "" # 50%の確率でメンションを追加
    mention = Random.rand(0..3) == 1 ? "@testuser1 " : "" # 25%の確率でメンションを追加
    hashtag = Faker::Address.city.gsub(" ", "_")
    content_with_mention_and_hashtag = mention + Faker::Lorem.paragraph + " #" + hashtag

    post_params = {
      content: content_with_mention_and_hashtag,
      images: images
    }

    post_service = PostService.new(user, post_params)
    post = post_service.create_post

    users_for_likes = User.order(Arel.sql('RAND()')).limit(Random.rand(0..5))

    users_for_likes.each do |like_user|
      Like.create!(user_id: like_user.id, post_id: post.id) unless Like.exists?(user_id: like_user.id, post_id: post.id)
    end

    testuser1 = User.find_by(username: 'testuser1')
    if testuser1
      testuser1_posts = testuser1.posts.order(created_at: :desc)

      testuser1_posts.each do |post|
        Random.rand(0..1).times do
          Faker::Config.locale = 'ja'
          reply_hashtag = Faker::Address.city.gsub(" ", "_")
          reply_content_with_hashtag = Faker::Lorem.paragraph + " #" + reply_hashtag
          Faker::Config.locale = nil

          reply_params = {
            content: reply_content_with_hashtag
          }

          reply_user = User.order(Arel.sql('RAND()')).first # ランダムなユーザーを選択します

          reply_post = PostService.new(reply_user, reply_params, post.id).create_post # ランダムなユーザーが返信を作成します

          users_for_likes = User.order(Arel.sql('RAND()')).limit(Random.rand(0..5))

          users_for_likes.each do |like_user|
            Like.create!(user_id: like_user.id, post_id: reply_post.id) unless Like.exists?(user_id: like_user.id, post_id: reply_post.id)
          end
        end
      end
      posts = Post.order(Arel.sql('RAND()')).limit(15)
      posts.each do |post|
        Bookmark.create!(user: testuser1, post: post) unless Bookmark.exists?
      end
    end
  end
end