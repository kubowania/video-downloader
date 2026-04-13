# Video Downloader

A web app for searching and downloading short videos. It uses the SerpApi Google Short Videos engine to find videos and [yt-dlp](https://github.com/yt-dlp/yt-dlp) to download them.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) installed and available on your `PATH`
- A [SerpApi]([https://serpapi.link/ania](https://serpapi.com/google-short-videos-api?utm_source=freecodecamp)) API key

### Install yt-dlp (macOS)

```bash
brew install yt-dlp
```

## Setup

1. **Clone the repo and install dependencies:**

```bash
npm install
```

2. **Configure your SerpApi key:**

Create a `.env` file in the project root:

```
API_KEY=your_api_key_here
```

> Note: The project uses `dotenv` — make sure to load it and reference `process.env.API_KEY` in `index.js` rather than hardcoding your key.

## Running the App

```bash
node index.js
```

The server will start at [http://localhost:3000](http://localhost:3000).

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Search for short videos using the search bar.
3. Click download on any result — the video will be saved as an `.mp4` to the `downloads/` folder.
4. Downloaded files are also accessible at `http://localhost:3000/downloads/<filename>`.

## Project Structure

```
video-downloader/
├── index.js          # Express server and API routes
├── public/
│   ├── index.html    # Frontend UI
│   ├── app.js        # Frontend JavaScript
│   └── styles.css    # Styles
└── downloads/        # Downloaded videos (auto-created)
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search?q=<query>&count=<n>` | Search for short videos |
| POST | `/api/download` | Download a video by URL |
