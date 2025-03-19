from PIL import Image, ImageDraw, ImageFont

def generate_image(text, output_path):
    # Create a blank image with white background
    width, height = 800, 400
    image = Image.new('RGB', (width, height), 'white')
    draw = ImageDraw.Draw(image)

    # Load a font
    font_path = "arial.ttf"  # Ensure this font file is available in your system or provide the path to a different .ttf file
    font_size = 40
    font = ImageFont.truetype(font_path, font_size)

    # Calculate text size and position
    text_width, text_height = draw.textsize(text, font=font)
    text_x = (width - text_width) // 2
    text_y = (height - text_height) // 2

    # Draw text on the image
    draw.text((text_x, text_y), text, fill="black", font=font)

    # Save the image
    image.save(output_path)
    print(f"Image saved to {output_path}")

if __name__ == "__main__":
    text = "Hello, World!"
    output_path = "output_image.png"
    generate_image(text, output_path)