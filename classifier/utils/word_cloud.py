import io
import base64
from wordcloud import WordCloud
import matplotlib.pyplot as plt

def generate_word_cloud(text):
    
    # Create a word cloud
    wordcloud = WordCloud(width=600, height=300,
                        background_color='#070610', colormap='Oranges').generate(text)

    # Display the generated word cloud
    plt.figure(figsize=(6, 3), facecolor='#070610', edgecolor='#070610')
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis("off")
    plt.subplots_adjust(top=1, bottom=0, right=1, left=0, hspace=0, wspace=0)
    plt.margins(0, 0)

    # Save the plot to buffer
    buffer = io.BytesIO()
    plt.savefig(buffer, format='jpg', bbox_inches='tight', pad_inches=0)
    buffer.seek(0)

    # Encode the buffer's content in base64
    base64_string = base64.b64encode(buffer.getvalue()).decode()

    # Print the base64 string
    return base64_string
