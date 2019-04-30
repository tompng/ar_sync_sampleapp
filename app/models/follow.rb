class Follow < ApplicationRecord
  belongs_to :from, class_name: 'User'
  belongs_to :to, class_name: 'User'

  sync_parent :from, inverse_of: :followingCount
  sync_parent :to, inverse_of: :followedCount
  sync_parent :from, inverse_of: :followings
  sync_parent :to, inverse_of: :followeds
  sync_parent :from, inverse_of: :isFollowed, only_to: -> { to }
  sync_parent :to, inverse_of: :isFollowing, only_to: -> { from }
  sync_has_one :from, type: -> { User }, only: %i[id name]
  sync_has_one :to, type: -> { User }, only: %i[id name]
end
