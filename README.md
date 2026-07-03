<div align="center">
  <img src="[https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/MyAnimeList_Logo.png/800px-MyAnimeList_Logo.png](https://static.vecteezy.com/system/resources/previews/029/171/931/large_2x/mal-letter-logo-design-inspiration-for-a-unique-identity-modern-elegance-and-creative-design-watermark-your-success-with-the-striking-this-logo-vector.jpg)" alt="MAL Logo" width="200"/>
  <h1>🌟 Anime Discovery & Explorer</h1>
  <p><strong>A cinematic, blazing-fast anime encyclopedia built for the Web and Discord.</strong></p>
  
  <a href="https://discord.com/oauth2/authorize?client_id=1520782050259374262&permissions=3146240&integration_type=0&scope=bot+applications.commands">
    <img src="https://img.shields.io/badge/Add_to_Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Invite to Discord"/>
  </a>
</div>

---

## 📖 What is this? (For Everyone)

Welcome to the **Anime Discovery Explorer**! This project is a premium, beautifully designed anime encyclopedia that looks and feels like a high-end streaming service (think Crunchyroll or Netflix), but is powered by real-time data from MyAnimeList. 

Whether you want to browse what's trending this season or search for your favorite childhood anime, you can do it all in a sleek, ad-free, cinematic interface.

**The coolest part?** It comes in two flavors:
1. **The Web App:** A standalone website you can visit on your phone or computer.
2. **The Discord Activity:** A dedicated version perfectly tailored to run *inside* Discord voice channels so you can browse anime together with your friends!

---

## 💻 Under the Hood (For Developers)

If you're a developer, you'll appreciate the architecture. This repository contains a highly optimized **Vite + React** frontend powered by a custom **Vercel Serverless Backend**. 

To completely bypass the notoriously slow caching limits of public APIs (like Jikan), this project features a custom Vercel Edge Function (`api/mal.js`) that uses `mal-scraper` to scrape MyAnimeList in real-time. We then apply our own strategic 6-hour CDN edge caching (`s-maxage=21600`) to ensure instant load times without hammering the MAL servers.

### 📂 Repository Structure

This repository is uniquely structured to house both the main Web App and the standalone Discord Activity Bot side-by-side without interference:

- `/` **(Root Directory)**: Contains the main Web Application source code. 
- `/DC Bot Anime Status/`: Contains the isolated codebase specifically engineered for the Discord Embedded App SDK. This version includes precise Content-Security-Policy (CSP) headers and handshake logic required by Discord's iframe security constraints.

### 🚀 Tech Stack
- **Frontend:** React 19, Vite, Lucide Icons, Pure CSS (Custom Design System).
- **Backend:** Node.js, Vercel Serverless Functions (`/api`).
- **Data Source:** Real-time MyAnimeList scraping (`mal-scraper`).
- **Infrastructure:** Vercel Edge CDN.

### 🛠️ How to run locally
1. Clone the repository.
2. Navigate to the root directory (or `cd "DC Bot Anime Status"` for the Discord version).
3. Run `npm install` to install dependencies.
4. Run `npx vercel dev` to spin up both the Vite frontend and the Serverless API locally.

---

## ⚖️ License & Terms of Use

**Copyright (c) 2026 Zcross091. All Rights Reserved.**

This software is provided for personal, non-commercial use only. You are completely free to use, run, and enjoy the applications provided in this repository! 

**However, the following strict restrictions apply to protect ownership rights:**
- 🚫 **NO MODIFICATIONS:** You may not edit, modify, adapt, reverse-engineer, or create derivative works from this codebase.
- 🚫 **NO REDISTRIBUTION:** You may not clone, distribute, publish, sublicense, or sell this software or any part of it. 

Please refer to the `LICENSE` file for the full legal terms.
