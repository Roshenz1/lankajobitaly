#!/usr/bin/env python3
"""
Simple Web Interface for Airport Terminal Video Generator
Click and download - no command line needed!
"""

from flask import Flask, render_template, request, send_file, jsonify
import os
from generate_airport_terminal_video import AirportTerminalVideoGenerator
import threading

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs('generated_videos', exist_ok=True)

# Track generation status
generation_status = {
    'processing': False,
    'message': '',
    'progress': 0
}


@app.route('/')
def index():
    """Main page with upload form."""
    return render_template('video_generator.html')


@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle image upload."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type. Use JPG, PNG, or GIF'}), 400

    # Save uploaded file
    filename = 'airport_terminal.jpg'
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    return jsonify({
        'success': True,
        'message': 'Image uploaded successfully!',
        'filename': filename
    })


@app.route('/generate', methods=['POST'])
def generate_video():
    """Generate video with selected language."""
    global generation_status

    if generation_status['processing']:
        return jsonify({'error': 'Video generation already in progress'}), 400

    language = request.json.get('language', 'en')
    if language not in ['en', 'it', 'si']:
        return jsonify({'error': 'Invalid language'}), 400

    # Check if image exists
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'airport_terminal.jpg')
    if not os.path.exists(image_path):
        return jsonify({'error': 'Please upload an image first'}), 400

    # Run generation in background
    generation_status['processing'] = True
    generation_status['message'] = 'Generating video...'
    generation_status['progress'] = 0

    thread = threading.Thread(
        target=generate_video_async,
        args=(image_path, language)
    )
    thread.daemon = True
    thread.start()

    return jsonify({'success': True, 'message': 'Video generation started'})


def generate_video_async(image_path, language):
    """Generate video asynchronously."""
    global generation_status

    try:
        generation_status['message'] = 'Generating voiceover...'
        generation_status['progress'] = 30

        generator = AirportTerminalVideoGenerator(image_path=image_path)

        generation_status['message'] = 'Creating video file...'
        generation_status['progress'] = 60

        # Get audio file
        narrations = {
            'en': """Welcome to Colombo International Airport. This is the busy departure terminal
where thousands of Sri Lankan workers embark on their journeys to opportunities abroad.
The forecourt is bustling with activity - families saying goodbye, porters managing luggage,
and travelers preparing for new adventures. Whether it's Italy, the Middle East, or beyond,
this airport is a gateway to better employment and brighter futures for many.
Today, we celebrate the courage and determination of our migrant workers.""",

            'it': """Benvenuti all'Aeroporto Internazionale di Colombo. Questo è il terminal delle partenze
dove migliaia di lavoratori dello Sri Lanka intraprendono i loro viaggi verso opportunità all'estero.
Il piazzale è pieno di attività - famiglie che si salutano, facchini che gestiscono i bagagli,
e viaggiatori che si preparano per nuove avventure. Che sia l'Italia, il Medio Oriente o oltre,
questo aeroporto è un gateway per l'occupazione migliore e un futuro più luminoso per molti.
Oggi celebriamo il coraggio e la determinazione dei nostri lavoratori migranti.""",

            'si': """කොළඹ ජාත්‍යන්තර ගුවන්තොටුපළට සාදරයෙන් පිළිගනිමු. මෙය ඔබ්බට යෑමේ ටර්මිනල්
එතැනින් ශ්‍රී ලංකාවේ දහස් දහසක් කම්කරුවරු විදේශ රැකියා අවස්ථා සොයා ගිහින් ගමන් කරන බව.
පුරාවිඩු නගරය - පවුල් සබඳු වී සිටින අවස්ථාව, ගිණි තිරකර සරණ ගිණී,
සහ ගමනාම ගිණු නව ඇවිදුම් සඳහා සූදානම් වෙමින් සිටින ගමනාගමකරුවරු.
ඉතාලිය, මැදපෙරදිග හෝ එයින් පිටතට, මෙම ගුවන්තොටුපළ හොඳ සේවා සහ බොහෝ දෙනා සඳහා
ඉතා සැහැල්ලු ඉන්දි ගේට්ටුවයි. අද අපි ගිණු දේශ කර්ම කරුවරුගේ සාහසය සහ
දෘඪ අදහස සඳහා සිදුවීම සිදුවේ."""
        }

        audio_path = generator.generator.generate_narrative(
            text=narrations[language],
            language=language,
            output_path=f'generated_narratives/airport_terminal_{language}.wav',
            speaker_name='airport_terminal'
        )

        if not audio_path:
            raise Exception('Failed to generate audio')

        generation_status['progress'] = 75

        # Create video
        output_filename = f"airport_terminal_{language}.mp4"
        output_path = os.path.join('generated_videos', output_filename)

        success = generator.create_video_from_image(audio_path, output_path)

        if success:
            generation_status['message'] = 'Done! Ready to download'
            generation_status['progress'] = 100
            generation_status['video_file'] = output_filename
        else:
            raise Exception('Failed to create video')

    except Exception as e:
        generation_status['message'] = f'Error: {str(e)}'
        generation_status['progress'] = 0
    finally:
        generation_status['processing'] = False


@app.route('/status')
def get_status():
    """Get generation status."""
    return jsonify(generation_status)


@app.route('/download/<filename>')
def download_file(filename):
    """Download generated video."""
    # Validate filename to prevent directory traversal
    if '..' in filename or '/' in filename:
        return jsonify({'error': 'Invalid filename'}), 400

    filepath = os.path.join('generated_videos', filename)

    if not os.path.exists(filepath):
        return jsonify({'error': 'File not found'}), 404

    return send_file(filepath, as_attachment=True)


def allowed_file(filename):
    """Check if file is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'jpg', 'jpeg', 'png', 'gif'}


if __name__ == '__main__':
    print("🎬 Airport Terminal Video Generator")
    print("=" * 50)
    print("📱 Open your browser and go to:")
    print("   http://localhost:5000")
    print("=" * 50)
    app.run(debug=True, port=5000)
