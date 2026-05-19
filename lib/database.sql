-- ========================================
-- Lanka Job Italy - Database Schema
-- ========================================
-- Copy and paste this into Supabase SQL Editor to set up your database

-- ========== JOBS TABLE ==========
CREATE TABLE IF NOT EXISTS jobs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  city TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('elder', 'clean', 'baby', 'factory')),
  salary TEXT,
  description TEXT NOT NULL,
  icon TEXT,
  is_permanent BOOLEAN DEFAULT true,
  is_new BOOLEAN DEFAULT true,
  is_urgent BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_jobs_type ON jobs(type);
CREATE INDEX idx_jobs_city ON jobs(city);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);

-- ========== RESTAURANTS TABLE ==========
CREATE TABLE IF NOT EXISTS restaurants (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  city TEXT,
  image_url TEXT,
  rating DECIMAL(3, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_restaurants_city ON restaurants(city);
CREATE INDEX idx_restaurants_rating ON restaurants(rating DESC);

-- ========== REVIEWS TABLE ==========
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_reviews_restaurant_id ON reviews(restaurant_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

-- ========== FORUM CATEGORIES TABLE ==========
CREATE TABLE IF NOT EXISTS forum_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  slug TEXT NOT NULL UNIQUE,
  order_num INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========== FORUM THREADS TABLE ==========
CREATE TABLE IF NOT EXISTS forum_threads (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES forum_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_forum_threads_category_id ON forum_threads(category_id);
CREATE INDEX idx_forum_threads_author_id ON forum_threads(author_id);
CREATE INDEX idx_forum_threads_created_at ON forum_threads(created_at DESC);

-- ========== FORUM REPLIES TABLE ==========
CREATE TABLE IF NOT EXISTS forum_replies (
  id BIGSERIAL PRIMARY KEY,
  thread_id BIGINT NOT NULL REFERENCES forum_threads(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_forum_replies_thread_id ON forum_replies(thread_id);
CREATE INDEX idx_forum_replies_author_id ON forum_replies(author_id);

-- ========== CHAT ROOMS TABLE ==========
CREATE TABLE IF NOT EXISTS chat_rooms (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  is_private BOOLEAN DEFAULT false,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========== CHAT ROOM MEMBERS TABLE ==========
CREATE TABLE IF NOT EXISTS room_members (
  room_id BIGINT NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (room_id, user_id)
);

CREATE INDEX idx_room_members_user_id ON room_members(user_id);

-- ========== CHAT MESSAGES TABLE ==========
CREATE TABLE IF NOT EXISTS room_messages (
  id BIGSERIAL PRIMARY KEY,
  room_id BIGINT NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_room_messages_room_id ON room_messages(room_id);
CREATE INDEX idx_room_messages_created_at ON room_messages(created_at DESC);

-- ========== DIRECT MESSAGES TABLE ==========
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  recipient_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);

-- ========== USER PROFILES TABLE ==========
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_moderator BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========== ENABLE ROW LEVEL SECURITY ==========
-- Jobs (Public Read, Authenticated Write)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Jobs are viewable by everyone" ON jobs FOR SELECT USING (true);
CREATE POLICY "Jobs can be created by authenticated users" ON jobs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Restaurants (Public Read, Authenticated Write)
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Restaurants are viewable by everyone" ON restaurants FOR SELECT USING (true);
CREATE POLICY "Restaurants can be created by authenticated users" ON restaurants FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Reviews (Public Read, Authenticated Write)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Reviews can be created by authenticated users" ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Forum (Public Read, Authenticated Write)
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Forum threads are viewable by everyone" ON forum_threads FOR SELECT USING (true);
CREATE POLICY "Forum threads can be created by authenticated users" ON forum_threads FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- User Profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User profiles are viewable by everyone" ON user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- ========== SAMPLE DATA ==========
-- Insert sample forum categories
INSERT INTO forum_categories (name, description, icon, slug, order_num) VALUES
  ('Jobs & Work', 'Discuss job opportunities and work experiences', '💼', 'jobs-work', 1),
  ('General Discussion', 'General topics and community chat', '💬', 'general', 2),
  ('Local Tips', 'Share tips, recommendations, and local guides', '📍', 'local-tips', 3),
  ('Language & Culture', 'Learn Italian, discuss culture', '🇮🇹', 'language-culture', 4)
ON CONFLICT (slug) DO NOTHING;
