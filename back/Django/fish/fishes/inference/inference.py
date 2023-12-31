import os

from keras.models import load_model  # TensorFlow is required for Keras to work
from PIL import Image, ImageOps  # Install pillow instead of PIL
import numpy as np
from io import BytesIO

from django.contrib.staticfiles import finders
from django.conf import settings

def get_fish_name(file_path):
    # Disable scientific notation for clarity
    np.set_printoptions(suppress=True)

    # Load the model
<<<<<<< HEAD
    model_path = os.path.join("fish-recognition", "keras_Model.h5")
=======
    model_path = os.path.join("fish-recognition", "keras_model.h5")
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    # print(os.path.join("fish-recognition", "keras_Model.h5"))
    # model_path = finders.find(os.path.join("fish-recognition", "keras_Model.h5"))
    # print("path", model_path)
    model_path = os.path.join(settings.STATIC_ROOT, model_path)

    # model_path = finders.find("fish-recognition\\kears_Model.h5")
    # print("path", model_path)
    model = load_model(model_path, compile=False)

    # Load the labels
    label_path = os.path.join("fish-recognition", "labels.txt")
    label_path = os.path.join(settings.STATIC_ROOT, label_path)
    # label_path = finders.find(os.path.join("fish-recognition", "labels.txt"))
    class_names = open(label_path, "r", encoding='UTF8').readlines()

<<<<<<< HEAD
=======
    print('-------------------------------------------------------------------------')
    print(class_names)
    print('-------------------------------------------------------------------------')

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    # Create the array of the right shape to feed into the keras model
    # The 'length' or number of images you can put into the array is
    # determined by the first position in the shape tuple, in this case 1
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

    # Replace this with the path to your image
    image = Image.open(BytesIO(file_path)).convert("RGB")

    # resizing the image to be at least 224x224 and then cropping from the center
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

    # turn the image into a numpy array
    image_array = np.asarray(image)

    # Normalize the image
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

    # Load the image into the array
    data[0] = normalized_image_array

    # Predicts the model
    prediction = model.predict(data)
<<<<<<< HEAD
    index = np.argmax(prediction)
    class_name = class_names[index]
=======

    print(prediction)

    index = np.argmax(prediction)

    print(index)

    class_name = class_names[index]

    print(class_name)
    
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    confidence_score = prediction[0][index]

    # Print prediction and confidence score
    print("Class:", class_name[2:], end="")
    print("Confidence Score:", confidence_score)

    return class_name[2:].strip()
