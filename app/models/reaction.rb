class Reaction < ApplicationRecord
  belongs_to :target, polymorphic: true
  belongs_to :user
  enum kind: %i[like dislike]

  sync_parent :target, inverse_of: :reactions
  sync_parent :target, inverse_of: :reactionSummary
  sync_parent :target, inverse_of: :myReaction, only_to: -> { user }
  sync_has_data :kind, :createdAt
  sync_has_one :user, only: %i[id name isFollowing isFollowed]
end
