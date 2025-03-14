from PIL import Image, ImageDraw, ImageFont
import io

def create_gif(size, filename, text):
    frames = []
    colors = ['#1E0B36', '#FF4D8D']
    font = ImageFont.truetype("arial.ttf", 20)
    
    for color in colors:
        img = Image.new('RGB', size, color)
        draw = ImageDraw.Draw(img)
        draw.text((10, 10), text, font=font, fill='white')
        frames.append(img)
    
    frames[0].save(f'public/downloads/{filename}', save_all=True, append_images=frames[1:], duration=1000, loop=0)

create_gif((728, 90), 'leaderboard-728x90.gif', 'Raffily Leaderboard')
create_gif((300, 250), 'medium-rectangle-300x250.gif', 'Raffily Medium Rectangle')
create_gif((160, 600), 'wide-skyscraper-160x600.gif', 'Raffily Wide Skyscraper')

