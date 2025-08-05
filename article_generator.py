#!/usr/bin/env python3
"""
Smart Home Article Generator

This script reads article ideas from articles-ideas.csv and uses OpenAI API
to generate tech-oriented blog articles in markdown format.
"""

import csv
import os
import time
import re
from pathlib import Path
from openai import OpenAI
from datetime import datetime

class ArticleGenerator:
    def __init__(self, api_key=None):
        """
        Initialize the article generator with OpenAI API key.

        Args:
            api_key (str): OpenAI API key. If None, will look for OPENAI_API_KEY env var.
        """
        self.client = OpenAI(api_key=api_key or os.getenv('OPENAI_API_KEY'))
        self.articles_dir = Path('articles')
        self.csv_file = 'articles-ideas.csv'

        # Create articles directory if it doesn't exist
        self.articles_dir.mkdir(exist_ok=True)

    def load_article_ideas(self):
        """
        Load article ideas from the CSV file.

        Returns:
            list: List of article titles/ideas
        """
        ideas = []
        try:
            with open(self.csv_file, 'r', encoding='utf-8') as file:
                reader = csv.reader(file)
                for row in reader:
                    if row and row[0].strip():  # Skip empty rows
                        ideas.append(row[0].strip())

            print(f"✅ Loaded {len(ideas)} article ideas from {self.csv_file}")
            return ideas

        except FileNotFoundError:
            print(f"❌ Error: {self.csv_file} not found!")
            return []
        except Exception as e:
            print(f"❌ Error reading CSV file: {e}")
            return []

    def create_filename(self, title):
        """
        Create a clean filename from article title.

        Args:
            title (str): Article title

        Returns:
            str: Clean filename with .md extension
        """
        # Remove special characters and convert to lowercase
        clean_title = re.sub(r'[^\w\s-]', '', title)
        clean_title = re.sub(r'[-\s]+', '-', clean_title)
        clean_title = clean_title.strip('-').lower()

        # Limit length to avoid filesystem issues
        if len(clean_title) > 50:
            clean_title = clean_title[:50].rstrip('-')

        return f"{clean_title}.md"

    def generate_article(self, title):
        """
        Generate a full article using OpenAI API.

        Args:
            title (str): Article title/idea

        Returns:
            str: Generated markdown article content
        """
        prompt = f"""
Write a comprehensive, engaging blog article about: "{title}"

Requirements:
- Write in a natural, human tone that's tech-oriented but accessible
- Target audience: Smart home enthusiasts and tech-savvy homeowners
- Format: Markdown with proper headers, lists, and structure
- Length: 2500-3500 words
- Include practical tips, recommendations, and actionable advice
- Add relevant sections like introduction, main content, tips, and conclusion
- Use technical terms appropriately but explain them when needed
- Make it SEO-friendly with good structure
- Include specific product recommendations where relevant
- Add practical examples and real-world scenarios

Structure the article with:
1. Engaging introduction that hooks the reader
2. Well-organized main content with clear headers
3. Practical tips and actionable advice
4. Specific examples and use cases
5. Conclusion with key takeaways

Write the article now:
"""

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert tech blogger specialized in smart home technology. You write engaging, informative articles that help readers understand and implement smart home solutions."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=4000,
                temperature=0.7
            )

            return response.choices[0].message.content

        except Exception as e:
            print(f"❌ Error generating article for '{title}': {e}")
            return None

    def save_article(self, title, content):
        """
        Save article content to a markdown file.

        Args:
            title (str): Article title
            content (str): Article content in markdown

        Returns:
            bool: True if saved successfully, False otherwise
        """
        if not content:
            return False

        filename = self.create_filename(title)
        filepath = self.articles_dir / filename

        # Add metadata header
        metadata = f"""---
title: "{title}"
date: {datetime.now().strftime('%Y-%m-%d')}
author: "Smart Home Blog"
category: "Smart Home"
tags: ["smart home", "automation", "technology"]
---

"""

        full_content = metadata + content

        try:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(full_content)
            print(f"✅ Saved: {filename}")
            return True

        except Exception as e:
            print(f"❌ Error saving '{filename}': {e}")
            return False

    def generate_all_articles(self, delay=2):
        """
        Generate all articles from the CSV file.

        Args:
            delay (int): Delay between API calls in seconds to avoid rate limits
        """
        ideas = self.load_article_ideas()

        if not ideas:
            print("❌ No article ideas found. Exiting.")
            return

        print(f"\n🚀 Starting generation of {len(ideas)} articles...")
        print(f"📁 Articles will be saved in: {self.articles_dir.absolute()}")
        print("-" * 60)

        successful = 0
        failed = 0

        for i, title in enumerate(ideas, 1):
            print(f"\n[{i}/{len(ideas)}] Generating: {title}")

            # Check if article already exists
            filename = self.create_filename(title)
            filepath = self.articles_dir / filename

            if filepath.exists():
                print(f"⏭️  Skipping (already exists): {filename}")
                continue

            # Generate article
            content = self.generate_article(title)

            if content and self.save_article(title, content):
                successful += 1
            else:
                failed += 1
                print(f"❌ Failed to generate: {title}")

            # Rate limiting delay
            if i < len(ideas):  # Don't delay after the last article
                print(f"⏱️  Waiting {delay} seconds...")
                time.sleep(delay)

        print("\n" + "=" * 60)
        print(f"🎉 Generation complete!")
        print(f"✅ Successful: {successful}")
        print(f"❌ Failed: {failed}")
        print(f"📁 Articles saved in: {self.articles_dir.absolute()}")

def main():
    """
    Main function to run the article generator.
    """
    print("🏠 Smart Home Article Generator")
    print("=" * 40)

    # Check for OpenAI API key
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        print("❌ Error: OPENAI_API_KEY environment variable not set!")
        print("Please set your OpenAI API key:")
        print("export OPENAI_API_KEY='your-api-key-here'")
        return

    try:
        # Initialize generator
        generator = ArticleGenerator()

        # Generate all articles
        generator.generate_all_articles(delay=3)  # 3 second delay between requests

    except KeyboardInterrupt:
        print("\n⏹️  Generation stopped by user.")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    main()
