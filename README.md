# Moodly

Moodly is an AI-driven emotion tracking platform that allows users to chat and express their feelings.  
The system uses sentiment analysis to detect emotional patterns in conversations and identify users whose day might not be going great.

## Features
- User authentication and secure registration
- AI-powered emotion and mood analysis
- Real-time chat between users
- Mood selection and tracking
- Personalized emotional insights
- MongoDB integration for user and chat data storage
    
## Introduction
## Purpose
The purpose of this document is to provide a comprehensive specification for Empathy Buddy, an AI-powered emotional-support and mood-matching chat platform. It outlines the system’s functional requirements, non-functional requirements, constraints, user interactions, and expected behaviors.
This document serves as a foundational reference for designers, developers, testers, project managers, and stakeholders who require a clear understanding of how the system should operate and the outcomes it must achieve.
By defining system expectations early, this specification ensures:
-A unified interpretation of the project goals
-Reduced ambiguity throughout the development cycle
-Measurable performance standards for testing, validation, and risk assessment
-A stable baseline for future upgrades
-Continued alignment with ethical, technical, and user-centered standards

## Scope
Empathy Buddy is an anonymous digital platform designed to promote emotional well-being by enabling users to connect with others who share similar or complementary moods. Users express their feelings by selecting from a curated set of mood emojis, which act as input for the platform’s intelligent matching engine.
If no suitable human match is available, the system automatically deploys an integrated Gemini-powered AI chatbot to provide empathetic, context-aware responses—ensuring that no user is left without support.
The platform prioritizes:
-Privacy and confidentiality
-Minimal data collection
-Transparent emotional-data processing
-Safe, non-clinical emotional support

Empathy Buddy is not a medical or therapeutic tool; instead, it serves as a supportive companion for emotional expression and connection. The system incorporates ethical AI principles, including fairness, transparency, responsible data handling, and well-being safeguards to ensure safe, respectful interactions.

## Objectives
## A. Emotional Support & Safe Expression
-Provide a secure, anonymous, judgment-free space for users to express their emotions.
-Reduce emotional isolation by giving users an accessible outlet to share feelings without fear of criticism.
## B. Empathy-Driven User Matching
-Implement a smart mood-matching algorithm that pairs users based on similar or complementary emotional states.
-Encourage empathetic, peer-to-peer conversations through meaningful emotional alignment.
## C. AI-Powered Interaction When Human Support Is Unavailable
-Integrate a Gemini-based AI capable of interpreting emotional cues and generating supportive responses.
-Ensure continuous availability so users always have someone—human or AI—to talk to.
## D. Privacy, Consent, and Ethical AI Compliance
-Maintain strict privacy by keeping all interactions anonymous and limiting data collection.
-Use clear consent mechanisms so users understand how emotional data is handled.
-Follow ethical AI standards ensuring fairness, safety, and emotional sensitivity.
## E. User Well-being and Mental Wellness Promotion
-Encourage positive emotional habits by offering a safe space for reflection and expression.
-Prevent harmful, manipulative, or judgmental interactions.
-Provide a tool that can be used casually and safely for daily emotional self-care.
## F. System Reliability and User-Centered Design
-Deliver an intuitive, accessible interface for users of varying ages and digital skills.
-Ensure high performance and availability for uninterrupted emotional support.
-Support scalability to handle increasing user traffic without degrading system quality.

## Getting Started
1. Clone the repo  
   ```bash
   git clone <repo-name>

1. Install dependencies

   npm install

2. Run the project

   npm run dev

## Tech Stack
- React, Node.js, MongoDB, etc.

## System Architecture

<details>
<summary>1.0 Introduction</summary>

This document describes the system architecture of **Empathy Buddy**, an AI-powered mood‑matching chat application.  
The architecture focuses on how the system enables anonymous emotional support through mood-based matching, AI fallback, and sentiment analysis.

</details>

<details>
<summary>2.0 High-Level Architecture Overview</summary>

Empathy Buddy uses a **client–server architecture** supported by real-time communication, AI-driven sentiment analysis, and dual-database storage. Major layers:

### Frontend Layer (React + Tailwind CSS)
- Anonymous login screen  
- Mood selection interface (emoji-based)  
- Chat interface for real-time messaging  
- Optional mood dashboard (Chart.js or similar)

### Backend Layer (Node.js + Express.js)
- API endpoints for authentication, mood tracking, message processing  
- Real-time communication using Socket.io  
- Handles user matching logic  
- Connects to AI services for sentiment analysis and fallback chat

### AI/NLP Layer (Hugging Face Transformers)
- Sentiment analysis using models like *distilbert-base-uncased-finetuned-sst-2-english*  
- Generates emotional classification (positive, negative, neutral)  
- Provides AI fallback chat responses when no user is available

### Databases
- PostgreSQL → Users, moods, match history  
- MongoDB → Chat logs with timestamps

### Real-Time Communication
- Socket.io manages live chat, user status, and typing indicators

### Deployment & Technology Stack
- **Frontend:** React, Tailwind CSS, Vercel  
- **Backend:** Node.js, Express.js, Render / Railway  
- **Real-Time Engine:** Socket.io  
- **AI/NLP:** Hugging Face Transformers  
- **Databases:** PostgreSQL (users, moods), MongoDB (chat logs)

</details>

<details>
<summary>3.0 System Component Description</summary>

**Frontend (React)**  
- UI for anonymous login, mood selection, and chat  
- Sends mood, message, and login data to the backend  
- Uses WebSockets (Socket.io) for live chat communication  

**Backend (Node.js + Express)**  
- Main application server  
- REST APIs:  
  - `POST /api/auth/login`  
  - `POST /api/chat/message`  
  - `GET /api/match`  
  - `POST /api/sentiment`  
  - `GET /api/mood/history`  
- Coordinates user matching and chat sessions  

**AI/NLP Sentiment Analysis**  
- Processes user messages for sentiment classification  
- Supports matching logic (e.g., sad ↔ happy)  
- Provides fallback AI responses if no user match exists  

**Databases**  
- PostgreSQL: stores user profiles, moods, match history  
- MongoDB: stores chat messages and timestamps  

**Socket.io Real-Time Engine**  
- Manages bidirectional communication  
- Enables instant message delivery and chat session creation

</details>

<details>
<summary>4.0 Data Flow</summary>

1. User logs in anonymously and selects a mood using emojis.  
2. Backend records the mood and queues the user for matching.  
3. Matching system pairs users with opposite or compatible moods.  
4. If no human partner is available, the user is assigned an AI companion.  
5. Messages are analyzed using Hugging Face models (with consent).  
6. Chat logs → MongoDB, Mood & match history → PostgreSQL  
7. Users can optionally view mood trends using the dashboard feature.

</details>

<details>
<summary>5.0 System Architecture Diagram (Textual)</summary>



## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md)

## License
Distributed under the MIT License. See `LICENSE` for more info.
