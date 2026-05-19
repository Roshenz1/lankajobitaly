// Job Types
export type JobType = 'elder' | 'clean' | 'baby' | 'factory'

export interface Job {
  id: number
  title: string
  company: string
  city: string
  type: JobType
  salary?: string
  description: string
  icon?: string
  isPermanent: boolean
  isNew: boolean
  isUrgent: boolean
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

// Restaurant Types
export interface Restaurant {
  id: number
  name: string
  description: string
  city: string
  imageUrl?: string
  rating: number
  reviewCount: number
  createdAt: Date
}

export interface Review {
  id: number
  restaurantId: number
  author: string
  rating: number
  text: string
  createdAt: Date
}

// Forum Types
export interface ForumCategory {
  id: number
  name: string
  description: string
  icon: string
  slug: string
  orderNum: number
}

export interface ForumThread {
  id: number
  categoryId: number
  title: string
  content: string
  authorId: string
  authorName: string
  authorAvatar?: string
  isPinned: boolean
  views: number
  replyCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ForumReply {
  id: number
  threadId: number
  content: string
  authorId: string
  authorName: string
  authorAvatar?: string
  createdAt: Date
  updatedAt: Date
}

// Chat Types
export interface ChatRoom {
  id: number
  name: string
  isPrivate: boolean
  createdBy: string
  memberCount: number
  createdAt: Date
}

export interface Message {
  id: number
  roomId: number
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  createdAt: Date
}

// User Types
export interface UserProfile {
  id: string
  displayName: string
  avatarUrl?: string
  bio?: string
  isVerified: boolean
  isModerator: boolean
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
