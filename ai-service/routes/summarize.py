from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from services.pdf_service import extract_text_from_pdf, extract_text_from_image
from services.openai_service import summarize_document, detect_risks
import traceback

router = APIRouter()

@router.post("/summarize")
async def summarize(
    file: UploadFile = File(...),
    language: str = Form("hindi"),
    category: str = Form("legal")
):
    try:
        file_bytes = await file.read()
        
        # Text extract karo
        if file.content_type == "application/pdf":
            text = extract_text_from_pdf(file_bytes)
        elif file.content_type in ["image/jpeg", "image/png"]:
            text = extract_text_from_image(file_bytes)
        else:
            raise HTTPException(status_code=400, detail=f"File type not supported: {file.content_type}")
        
        if not text or len(text) < 10:
            raise HTTPException(status_code=400, detail="Document mein text nahi mila!")
        
        summary = summarize_document(text, language, category)
        risks = detect_risks(text, language)
        
        return {
            "success": True,
            "text_length": len(text),
            "summary": summary,
            "risks": risks
        }

    except HTTPException:
        raise
    except Exception as e:
        print("ERROR:", traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))