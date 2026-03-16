---
name: youtube-teacher
description: Takes a YouTube video URL and creates a comprehensive teaching markdown document from the video transcript. Use when the user asks to learn from, summarize, or be taught a YouTube video.
---

# YouTube Teacher Skill

## Overview
This skill extracts the transcript from a YouTube video and transforms it into a structured, educational markdown document that helps the user learn the video's content effectively.

## When to Use
- User provides a YouTube URL and asks to "learn", "teach me", "summarize", or "explain" the video
- User wants notes, a study guide, or a breakdown of a YouTube video
- User pastes a YouTube link and asks what it covers

## Instructions

### Step 1: Extract the Transcript

Run the helper script to extract the video transcript:

```bash
python3 .gemini/skills/youtube-teacher/scripts/get_transcript.py "<YOUTUBE_URL>"
```

The script outputs JSON with:
- `success`: whether extraction worked
- `video_id`: the YouTube video ID
- `video_url`: canonical URL
- `segments`: array of `{ start, duration, text }` entries
- `full_text`: the entire transcript as a single string

If the script fails (e.g., no captions available), inform the user that the video doesn't have available captions/subtitles and the skill cannot be used.

### Step 2: Analyze and Generate Teaching Document

Using the extracted transcript, create a comprehensive markdown document with the following structure:

```markdown
# 📺 [Inferred Video Title from content]

> **Source:** [YouTube Video](video_url)

---

## 🎯 TL;DR
A 2-3 sentence summary of what the video covers and why it matters.

---

## 📋 Table of Contents
Link to each major section below.

---

## 🔑 Key Concepts

### Concept 1: [Name]
- **What it is:** Clear explanation
- **Why it matters:** Practical relevance
- **Timestamp:** [MM:SS]

### Concept 2: [Name]
...repeat for each major concept...

---

## 📝 Detailed Notes

Organize the transcript content into logical sections with:
- Clear headings for each topic/section
- Bullet points for key information
- Timestamp references in [MM:SS] format
- Code snippets if the video covers code (formatted properly)
- Important quotes or statements highlighted with blockquotes

---

## 💡 Key Takeaways
A numbered list of the most important things to remember.

---

## ❓ Review Questions

Generate 5-8 questions to test understanding:
1. **Q:** [Question about a key concept]
   **A:** [Concise answer]

2. **Q:** [Question]
   **A:** [Answer]

...continue...

---

## 📚 Further Learning
Suggest related topics the viewer might want to explore based on the video content.
```

### Step 3: Save the Output

Save the generated markdown file in the user's current workspace with a descriptive filename based on the video content, e.g., `youtube-learning-[topic].md`.

## Rules
- Always include timestamps in [MM:SS] format when referencing specific parts
- Convert seconds from the transcript to MM:SS format (e.g., 125.5 seconds → 02:05)
- Use clear, simple language - the goal is to TEACH, not just transcribe
- Group related transcript segments into coherent sections rather than following the raw transcript order
- If the video contains code, format it properly with syntax highlighting
- If the transcript is in a non-English language, still generate the teaching document (in the same language as the transcript)
- Make the document scannable with good use of headings, bold text, and bullet points

## Notes
- This skill requires the `youtube-transcript-api` Python package. If not installed, run: `pip3 install youtube-transcript-api`
- Some videos may not have captions/subtitles available. In that case, inform the user.
- Auto-generated captions may contain inaccuracies - note this in the output if applicable.
