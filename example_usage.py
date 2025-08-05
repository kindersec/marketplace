#!/usr/bin/env python3
"""
Example usage of the Article Generator

This script shows different ways to use the ArticleGenerator class.
"""

import os
from article_generator import ArticleGenerator

def example_generate_single_article():
    """Example: Generate a single article"""
    print("=== Single Article Generation Example ===")

    generator = ArticleGenerator()

    # Generate one article
    title = "How to Choose the Perfect Smart Lock for Your Home"
    print(f"Generating article: {title}")

    content = generator.generate_article(title)
    if content:
        success = generator.save_article(title, content)
        if success:
            print("✅ Article generated and saved successfully!")
        else:
            print("❌ Failed to save article")
    else:
        print("❌ Failed to generate article")

def example_generate_custom_list():
    """Example: Generate articles from a custom list"""
    print("\n=== Custom List Generation Example ===")

    # Custom article ideas
    custom_ideas = [
        "Smart Home Security: Complete Guide to Protecting Your Connected Home",
        "Voice Assistants Comparison: Alexa vs Google Home vs Siri in 2024",
        "Budget Smart Home Setup: Transform Your Home for Under $200"
    ]

    generator = ArticleGenerator()

    print(f"Generating {len(custom_ideas)} custom articles...")

    for i, title in enumerate(custom_ideas, 1):
        print(f"\n[{i}/{len(custom_ideas)}] Processing: {title}")

        content = generator.generate_article(title)
        if content and generator.save_article(title, content):
            print(f"✅ Generated: {generator.create_filename(title)}")
        else:
            print(f"❌ Failed: {title}")

def example_check_existing_articles():
    """Example: Check what articles already exist"""
    print("\n=== Existing Articles Check ===")

    generator = ArticleGenerator()

    if generator.articles_dir.exists():
        existing_files = list(generator.articles_dir.glob("*.md"))

        if existing_files:
            print(f"Found {len(existing_files)} existing articles:")
            for file in existing_files:
                print(f"  📄 {file.name}")
        else:
            print("No existing articles found.")
    else:
        print("Articles directory doesn't exist yet.")

def main():
    """Run examples based on user choice"""

    # Check if API key is set
    if not os.getenv('OPENAI_API_KEY'):
        print("❌ Please set your OPENAI_API_KEY environment variable first!")
        print("Example: export OPENAI_API_KEY='your-key-here'")
        return

    print("🏠 Article Generator Examples")
    print("=" * 40)

    while True:
        print("\nChoose an example to run:")
        print("1. Check existing articles")
        print("2. Generate a single article")
        print("3. Generate from custom list")
        print("4. Generate all articles from CSV")
        print("5. Exit")

        choice = input("\nEnter your choice (1-5): ").strip()

        if choice == "1":
            example_check_existing_articles()
        elif choice == "2":
            example_generate_single_article()
        elif choice == "3":
            example_generate_custom_list()
        elif choice == "4":
            print("\n=== Generating All Articles from CSV ===")
            generator = ArticleGenerator()
            generator.generate_all_articles()
        elif choice == "5":
            print("👋 Goodbye!")
            break
        else:
            print("❌ Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
