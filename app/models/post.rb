class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :reactions, as: :target, dependent: :destroy

  include SyncReactionConcern
  sync_define_collection :latest10, limit: 10, order: :desc
  sync_parent :user, inverse_of: :posts
  sync_has_data :title, :body, :createdAt, :updatedAt
  sync_has_many :comments
  sync_has_many :commentsLast5, type: -> { [Comment] }, association: :comments, order: :desc, limit: 5
  sync_has_data :commentsCount, count_of: :comments
  sync_has_one :user, only: %i[id name isFollowing isFollowed]
  include SyncReactionConcern
end
