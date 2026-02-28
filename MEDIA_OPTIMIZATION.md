# Reducing image and video load times

The site is already set up to load media more efficiently (lazy loading, video poster, `preload="metadata"`). To **reduce file size** and speed up loading, compress the actual files and replace the originals in `Assets/`.

---

## Images

- **Tools (free):**
  - [Squoosh](https://squoosh.app) — drag and drop, choose quality/resize, download. Use “MozJPEG” or “WebP” for smaller files.
  - [TinyPNG](https://tinypng.com) — compresses JPG/PNG with little visible loss.
- **Suggested settings:** Resize so the longest side is at most 1920px for full-bleed images, 1200px for smaller ones. JPEG quality 80–85 (or “High” in Squoosh) is usually enough.
- **Optional:** Export as **WebP** in Squoosh and add `<picture>` with a WebP source and a JPG/PNG fallback for older browsers (we can add that markup if you provide WebP versions).

Replace the files in `Assets/` with the compressed versions (keep the same filenames so the site keeps working).

---

## Hero video (`Assets/Hero_video_ocean_3.mp4`)

Video file size has the biggest impact. Re-encode at lower resolution and/or bitrate:

- **HandBrake (free):**
  1. Open the original video.
  2. Preset: “Web” → “Gmail Medium 5 Minutes” or “Fast 720p30”.
  3. Or set **Resolution** to 1280×720 (720p), **Video encoder** to H.264, **Framerate** to 24 or 30.
  4. Under “Quality”, choose **Avg Bitrate** and try 1–2 Mbps (1500 kbps is a good start). Lower = smaller file, softer image.
  5. Encode, then replace `Hero_video_ocean_3.mp4` in `Assets/` with the new file.

- **FFmpeg (command line):**
  ```bash
  ffmpeg -i Hero_video_ocean_3.mp4 -vf "scale=1280:-2" -c:v libx264 -b:v 1.5M -c:a aac -b:a 128k Hero_video_ocean_3_720p.mp4
  ```
  Then rename the output to `Hero_video_ocean_3.mp4` and use it in `Assets/`.

The site uses `poster="Assets/hero_section.png"` and `preload="metadata"`, so the first frame appears quickly and the full video loads only when needed.

---

## Summary

| What                         | Done in code                         | You do |
|-----------------------------|--------------------------------------|--------|
| Hero video                  | `preload="metadata"`, poster image   | Re-encode to 720p, ~1.5 Mbps |
| Images                      | `loading="lazy"`, `decoding="async"` | Compress with Squoosh/TinyPNG, replace in `Assets/` |

After replacing the files, re-upload the updated `Assets/` (and any changed PHP/HTML) to the server.
