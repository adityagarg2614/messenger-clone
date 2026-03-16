#!/usr/bin/env python3
"""
YouTube Transcript Extractor
Extracts the transcript/captions from a YouTube video and outputs as JSON.
Usage: python3 get_transcript.py <youtube_url_or_video_id>
"""

import sys
import json
import re


def extract_video_id(url_or_id: str) -> str:
    """Extract the video ID from a YouTube URL or return as-is if already an ID."""
    patterns = [
        r'(?:v=|/v/|youtu\.be/|/embed/|/shorts/)([a-zA-Z0-9_-]{11})',
        r'^([a-zA-Z0-9_-]{11})$',
    ]
    for pattern in patterns:
        match = re.search(pattern, url_or_id)
        if match:
            return match.group(1)
    return url_or_id


def get_transcript(video_id: str) -> dict:
    """Fetch the transcript for a YouTube video."""
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
    except ImportError:
        return {
            "success": False,
            "error": "youtube-transcript-api is not installed. Run: pip3 install youtube-transcript-api",
        }

    try:
        ytt_api = YouTubeTranscriptApi()
        transcript = ytt_api.fetch(video_id)

        segments = []
        for entry in transcript.snippets:
            segments.append({
                "start": round(entry.start, 2),
                "duration": round(entry.duration, 2),
                "text": entry.text,
            })

        # Build full text for convenience
        full_text = " ".join(seg["text"] for seg in segments)

        return {
            "success": True,
            "video_id": video_id,
            "video_url": f"https://www.youtube.com/watch?v={video_id}",
            "segment_count": len(segments),
            "segments": segments,
            "full_text": full_text,
        }

    except Exception as e:
        return {
            "success": False,
            "video_id": video_id,
            "error": str(e),
        }


def main():
    if len(sys.argv) < 2:
        print(json.dumps({
            "success": False,
            "error": "Usage: python3 get_transcript.py <youtube_url_or_video_id>"
        }))
        sys.exit(1)

    url_or_id = sys.argv[1]
    video_id = extract_video_id(url_or_id)
    result = get_transcript(video_id)
    print(json.dumps(result, ensure_ascii=False, indent=2))

    if not result["success"]:
        sys.exit(1)


if __name__ == "__main__":
    main()
