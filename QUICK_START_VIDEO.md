# 🎬 Click & Download Video Generator

**No command line needed! Just click buttons in a web browser.**

## ⚡ 30-Second Setup

### 1. Install Dependencies (One Time Only)
```bash
pip install -r requirements.txt
sudo apt-get install ffmpeg
```

### 2. Start the App
```bash
python video_generator_app.py
```

You'll see:
```
🎬 Airport Terminal Video Generator
==================================================
📱 Open your browser and go to:
   http://localhost:5000
==================================================
```

### 3. Open Browser
Click this link or paste in your browser:
```
http://localhost:5000
```

## 📱 How to Use (3 Steps)

1. **Upload Image** - Click the upload area, select your airport terminal photo
2. **Choose Language** - Pick English 🇬🇧, Italian 🇮🇹, or Sinhala 🇱🇰
3. **Click Generate** - Wait for the video to process (30-60 seconds)
4. **Download** - Click "Download MP4" and save your video

**That's it!** Video is ready to upload to Facebook Reels, Instagram, TikTok, or YouTube Shorts.

## 📂 What You'll Get

- **airport_terminal_en.mp4** - English narration
- **airport_terminal_it.mp4** - Italian narration  
- **airport_terminal_si.mp4** - Sinhala narration

All ready to upload to social media.

## ⚙️ If Something Goes Wrong

**"Address already in use"**
- Another app is using port 5000
- Close other apps or wait a minute

**"ffmpeg not found"**
- On Mac: `brew install ffmpeg`
- On Windows: `choco install ffmpeg`
- On Linux: `sudo apt-get install ffmpeg`

**"OmniVoice not installed"**
- Run: `pip install -r requirements.txt`

**Video generation takes too long**
- That's normal (30-60 seconds)
- Don't close the browser window
- Progress bar shows what's happening

## 💡 Remember for Next Time

I've created this simple web interface specifically because you mentioned command-line tasks are complex. 

**In the future:**
- Always use `python video_generator_app.py` to start the web app
- Never need terminal commands after setup
- Just open browser, upload, click, download
- All done in the web interface

No more complex command-line tasks! 🎉
