class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :reactions, dependent: :destroy
  has_many :followings, class_name: 'Follow', foreign_key: :from_id, dependent: :destroy
  has_many :followeds, class_name: 'Follow', foreign_key: :to_id, dependent: :destroy
  has_many :following_users, through: :followings, source: :to
  has_many :followed_users, through: :followeds, source: :from
end
