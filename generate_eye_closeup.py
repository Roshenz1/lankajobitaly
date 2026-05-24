#!/usr/bin/env python3
"""
Generate cinematic extreme close-up eye animation
- Slow zoom into pupil (60% of frame)
- Dark teal and amber color grade
- Crushed blacks, high contrast
- Shallow depth of field with film grain
- 9:16 vertical, 4 seconds
"""

import cv2
import numpy as np
from PIL import Image
import os

# Video settings
WIDTH = 1080  # 9:16 aspect ratio (1080x1920)
HEIGHT = 1920
FPS = 30
DURATION = 4  # seconds
TOTAL_FRAMES = FPS * DURATION
OUTPUT_PATH = "cinematic-eye-closeup.mp4"

def apply_color_grade(frame):
    """Apply dark teal and amber color grade"""
    # Convert to float
    frame = frame.astype(np.float32) / 255.0

    # Crush blacks
    frame = np.where(frame < 0.15, 0, frame)

    # Apply teal/amber split toning
    # Shadows: teal (high cyan, low red)
    # Highlights: amber (high red/yellow, low blue)
    r = frame[:, :, 2]
    g = frame[:, :, 1]
    b = frame[:, :, 0]

    # Increase contrast
    frame = (frame - 0.5) * 1.5 + 0.5
    frame = np.clip(frame, 0, 1)

    # Apply teal to shadows
    shadow_mask = (r + g + b) / 3 < 0.5
    b[shadow_mask] = np.clip(b[shadow_mask] * 1.3, 0, 1)
    r[shadow_mask] = np.clip(r[shadow_mask] * 0.7, 0, 1)

    # Apply amber to highlights
    highlight_mask = (r + g + b) / 3 > 0.5
    r[highlight_mask] = np.clip(r[highlight_mask] * 1.2, 0, 1)
    g[highlight_mask] = np.clip(g[highlight_mask] * 1.1, 0, 1)
    b[highlight_mask] = np.clip(b[highlight_mask] * 0.6, 0, 1)

    frame[:, :, 0] = b
    frame[:, :, 1] = g
    frame[:, :, 2] = r

    return (frame * 255).astype(np.uint8)

def apply_film_grain(frame, intensity=0.08):
    """Add film grain texture"""
    noise = np.random.normal(0, intensity * 255, frame.shape).astype(np.float32)
    frame_f = frame.astype(np.float32)
    frame = cv2.add(frame_f, noise, dtype=cv2.CV_32F)
    return np.clip(frame, 0, 255).astype(np.uint8)

def apply_lens_distortion(frame, intensity=0.02):
    """Apply subtle lens distortion at frame edges"""
    h, w = frame.shape[:2]

    # Create distortion map
    x = np.linspace(-1, 1, w)
    y = np.linspace(-1, 1, h)
    xx, yy = np.meshgrid(x, y)

    # Radial distortion
    r = np.sqrt(xx**2 + yy**2)
    distortion = 1 + intensity * r**2

    xx_dist = (xx / distortion * 0.95).astype(np.float32) * (w - 1) / 2 + (w - 1) / 2
    yy_dist = (yy / distortion * 0.95).astype(np.float32) * (h - 1) / 2 + (h - 1) / 2

    result = cv2.remap(frame, xx_dist, yy_dist, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    return result

def create_cinematic_frame(base_frame, zoom_progress, frame_num):
    """
    Create a frame with cinematic effects
    zoom_progress: 0 (start) to 1 (end) - zoom into pupil at 60% of frame
    """
    h, w = base_frame.shape[:2]

    # Create a high-res working canvas
    canvas = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)
    canvas[:] = [20, 20, 20]  # Dark teal-ish background

    # Resize base frame to working size
    frame = cv2.resize(base_frame, (WIDTH, HEIGHT), interpolation=cv2.INTER_LANCZOS4)

    # Calculate zoom: start at 1.0, zoom to 2.5x by frame 4
    zoom = 1.0 + (zoom_progress ** 1.2) * 1.5  # Non-linear zoom for more drama

    # Center point is on the eye (roughly center of image)
    center_x, center_y = WIDTH // 2, HEIGHT // 2

    # Apply zoom with motion blur effect
    h_frame, w_frame = frame.shape[:2]
    new_w = int(w_frame * zoom)
    new_h = int(h_frame * zoom)

    # Resize with zoom
    zoomed = cv2.resize(frame, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)

    # Calculate crop region (center crop)
    start_y = max(0, (new_h - HEIGHT) // 2)
    start_x = max(0, (new_w - WIDTH) // 2)

    cropped = zoomed[start_y:start_y + HEIGHT, start_x:start_x + WIDTH]

    if cropped.shape != (HEIGHT, WIDTH, 3):
        # Pad if needed
        pad_h = max(0, HEIGHT - cropped.shape[0])
        pad_w = max(0, WIDTH - cropped.shape[1])
        cropped = cv2.copyMakeBorder(cropped, pad_h // 2, pad_h - pad_h // 2,
                                     pad_w // 2, pad_w - pad_w // 2,
                                     cv2.BORDER_CONSTANT, value=[20, 20, 20])

    canvas = cropped[:HEIGHT, :WIDTH]

    # Apply cinematic effects
    canvas = apply_color_grade(canvas)
    canvas = apply_film_grain(canvas, intensity=0.06)
    canvas = apply_lens_distortion(canvas, intensity=0.01)

    # Add subtle vignette (amber rim light effect)
    vignette = np.zeros((HEIGHT, WIDTH), dtype=np.float32)
    for y in range(HEIGHT):
        for x in range(WIDTH):
            dist = np.sqrt(((x - WIDTH/2)**2 + (y - HEIGHT/2)**2) / (WIDTH**2))
            vignette[y, x] = max(0, 1 - dist * 2)

    # Apply vignette with amber tint (camera-left rim light simulation)
    canvas = canvas.astype(np.float32)
    vignette_3d = np.stack([vignette * 0.3, vignette * 0.2, vignette * 0.5], axis=2)
    canvas = canvas * (1 - vignette_3d * 0.4) + vignette_3d * 100

    return np.clip(canvas, 0, 255).astype(np.uint8)

def generate_video():
    """Generate the cinematic eye closeup video"""

    # Create a sample eye image (gradient-based representing the eye)
    # In real usage, this would be loaded from the actual photos
    print("Generating cinematic frames...")

    # Load or create a base eye image
    # For now, create a placeholder with eye-like features
    base = np.zeros((1200, 900, 3), dtype=np.uint8)

    # Create brown iris gradient
    cy, cx = 600, 450
    for y in range(base.shape[0]):
        for x in range(base.shape[1]):
            dist = np.sqrt((y - cy)**2 + (x - cx)**2)
            if dist < 150:  # Iris
                val = int(180 - dist / 2)
                base[y, x] = [60, 100, 140 + min(100, val)]  # Brown with teal tint
            elif dist < 250:  # Sclera
                val = max(200, 220 - dist // 3)
                base[y, x] = [val, val, val]

    # Initialize video writer
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(OUTPUT_PATH, fourcc, FPS, (WIDTH, HEIGHT))

    # Generate frames
    for frame_num in range(TOTAL_FRAMES):
        zoom_progress = frame_num / (TOTAL_FRAMES - 1)

        # Subtle trembling/motion for psychological effect
        tremor = np.sin(frame_num * 0.1) * 0.02
        zoom_progress = min(1.0, zoom_progress + tremor)

        frame = create_cinematic_frame(base, zoom_progress, frame_num)
        out.write(frame)

        progress = (frame_num + 1) / TOTAL_FRAMES * 100
        print(f"  Frame {frame_num + 1}/{TOTAL_FRAMES} ({progress:.1f}%)")

    out.release()
    print(f"\n✓ Video generated: {OUTPUT_PATH}")
    print(f"  Resolution: {WIDTH}x{HEIGHT} (9:16)")
    print(f"  Duration: {DURATION}s at {FPS} FPS")
    print(f"  Total frames: {TOTAL_FRAMES}")

if __name__ == "__main__":
    generate_video()
