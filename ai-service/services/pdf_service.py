import pdfplumber
import io
from PIL import Image
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        text = ""
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        if not text.strip():
            raise Exception("PDF mein text nahi mila")
        return text.strip()
    except Exception as e:
        raise Exception(f"PDF extract nahi hua: {str(e)}")

def extract_text_from_image(file_bytes: bytes) -> str:
    try:
        image = Image.open(io.BytesIO(file_bytes))
        text = pytesseract.image_to_string(image, lang='eng')
        if not text.strip():
            raise Exception("Image mein text nahi mila")
        return text.strip()
    except Exception as e:
        raise Exception(f"Image extract nahi hua: {str(e)}")