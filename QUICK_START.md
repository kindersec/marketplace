# Quick Start Guide - Smart Home Article Generator

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
pip install openai
```

### Step 2: Set Your OpenAI API Key
```bash
# Windows PowerShell
$env:OPENAI_API_KEY="sk-your-actual-api-key-here"

# Mac/Linux
export OPENAI_API_KEY="sk-your-actual-api-key-here"
```

### Step 3: Run the Generator
```bash
python article_generator.py
```

That's it! The script will:
- ✅ Read all 26 article ideas from `articles-ideas.csv`
- ✅ Generate comprehensive markdown articles using GPT-4
- ✅ Save them in the `articles/` folder
- ✅ Show progress as it works

## 📊 What You'll Get

- **26 unique articles** based on your CSV file
- **1500-2500 words each** - comprehensive and detailed
- **Markdown format** with proper headers and structure
- **SEO-friendly** with good organization
- **Tech-oriented** but accessible language
- **Practical tips** and actionable advice

## 💰 Estimated Cost

Using GPT-4: Approximately **$5-15** for all 26 articles (depending on article length)

## 🔧 Alternative Options

### Use Cheaper Model (GPT-3.5-turbo)
Edit `article_generator.py` line 105:
```python
model="gpt-3.5-turbo",  # Instead of "gpt-4o"
```
Cost: ~$1-3 for all articles

### Generate Just a Few Articles
Use the example script:
```bash
python example_usage.py
```

### Test with One Article First
```python
from article_generator import ArticleGenerator

generator = ArticleGenerator()
content = generator.generate_article("Smart Home Security Tips")
generator.save_article("Smart Home Security Tips", content)
```

## 📁 Output Structure
```
articles/
├── what-is-a-smart-home-a-beginners-guide.md
├── how-to-start-your-smart-home-setup.md
├── 10-common-smart-home-myths-debunked.md
├── smart-thermostats-showdown-nest-vs-tado.md
└── ... (22 more articles)
```

## 🎯 Ready to Start?

Just run:
```bash
python article_generator.py
```

The script is designed to be:
- **Safe**: Won't overwrite existing articles
- **Resumable**: Can stop and restart anytime
- **Informative**: Shows progress and handles errors gracefully

Happy blogging! 🏠✨
