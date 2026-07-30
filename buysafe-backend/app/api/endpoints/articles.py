from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.db.session import get_db
from app.models.article import Article
from app.schemas.article import ArticleCreate, ArticleUpdate, ArticleResponse

router = APIRouter()

@router.get("/", response_model=List[ArticleResponse])
def get_articles(db: Session = Depends(get_db)):
    """Fetch all articles"""
    articles = db.query(Article).order_by(Article.created_at.desc()).all()
    return articles

@router.get("/{slug}", response_model=ArticleResponse)
def get_article(slug: str, db: Session = Depends(get_db)):
    """Fetch an article by slug"""
    article = db.query(Article).filter(Article.slug == slug).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@router.post("/", response_model=ArticleResponse, status_code=status.HTTP_201_CREATED)
def create_article(article_in: ArticleCreate, db: Session = Depends(get_db)):
    """Create a new article"""
    existing = db.query(Article).filter(Article.slug == article_in.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Article with this slug already exists")
    
    db_article = Article(
        id=f"art_{uuid.uuid4().hex[:8]}",
        **article_in.dict()
    )
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

@router.put("/{article_id}", response_model=ArticleResponse)
def update_article(article_id: str, article_in: ArticleUpdate, db: Session = Depends(get_db)):
    """Update an article"""
    db_article = db.query(Article).filter(Article.id == article_id).first()
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    update_data = article_in.dict(exclude_unset=True)
    if "slug" in update_data and update_data["slug"] != db_article.slug:
        existing = db.query(Article).filter(Article.slug == update_data["slug"]).first()
        if existing:
            raise HTTPException(status_code=400, detail="Article with this slug already exists")

    for field, value in update_data.items():
        setattr(db_article, field, value)

    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

@router.delete("/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_article(article_id: str, db: Session = Depends(get_db)):
    """Delete an article"""
    db_article = db.query(Article).filter(Article.id == article_id).first()
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    db.delete(db_article)
    db.commit()
    return None
