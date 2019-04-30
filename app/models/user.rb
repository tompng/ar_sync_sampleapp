class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :reactions, dependent: :destroy
  has_many :followings, class_name: 'Follow', foreign_key: :from_id, dependent: :destroy
  has_many :followeds, class_name: 'Follow', foreign_key: :to_id, dependent: :destroy
  has_many :following_users, through: :followings, source: :to
  has_many :followed_users, through: :followeds, source: :from

  sync_has_data :name
  sync_has_many :posts
  sync_has_many :followings
  sync_has_many :followeds
  sync_has_data :isFollowing, type: :boolean, preload: lambda { |users, current_user|
    Set.new Follow.where(from: current_user, to: users).pluck(:to_id)
  } do |preloaded|
    preloaded.include? id
  end
  sync_has_data :isFollowed, type: :boolean, preload: lambda { |users, current_user|
    Set.new Follow.where(from: users, to: current_user).pluck(&:from_id)
  } do |preloaded|
    preloaded.include? id
  end
  sync_has_data :followingCount, count_of: :followings
  sync_has_data :followedCount, count_of: :followeds
end
