from flask import Flask, send_file, request, render_template
from PIL import Image, ImageDraw, ImageFont
import io

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_image', methods=['POST'])
def generate_image():
    text = request.form.get('text', 'Hello, World!')
    width, height = 800, 400
    image = Image.new('RGB', (width, height), 'white')
    draw = ImageDraw.Draw(image)

    font_path = "arial.ttf"
    font_size = 40
    font = ImageFont.truetype(font_path, font_size)

    text_width, text_height = draw.textsize(text, font=font)
    text_x = (width - text_width) // 2
    text_y = (height - text_height) // 2

    draw.text((text_x, text_y), text, fill="black", font=font)

    img_io = io.BytesIO()
    image.save(img_io, 'PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png')

if __name__ == "__main__":
    app.run(debug=True)