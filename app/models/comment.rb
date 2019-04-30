class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  has_many :reactions, as: :target, dependent: :destroy

  include SyncReactionConcern
  sync_parent :post, inverse_of: :comments
  sync_parent :post, inverse_of: :commentsLast5
  sync_parent :post, inverse_of: :commentsCount
  sync_has_data :postId, :body, :createdAt, :updatedAt
  sync_has_one :user, only: %i[id name isFollowing isFollowed]
  include SyncReactionConcern
end
