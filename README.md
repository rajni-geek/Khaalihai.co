🚀 Khaalihai – QR Based Lead Collection System (Frontend)

This project is a simple and clean landing page built to collect user interest for upcoming launches in different areas using QR codes.

🔥 Overview

Users scan a QR code → Land on the page → Fill the form → Get confirmation.

The system captures user details along with the area from which they came.

🎯 Features
📍 Area-based dynamic landing page (via URL params)
🧾 Lead collection form (Name, Phone, Location)
✅ Form validation (required fields + phone check)
🚫 Duplicate handling (based on phone number)
🎉 Success message with dynamic area display
🎨 Modern UI with glassmorphism design (Tailwind CSS)
🧠 How It Works

Each QR code contains a unique URL:

/campaigns/qr-coming-soon?area=sangam-vihar
When a user scans the QR:
The landing page reads the area from the URL
Displays it dynamically in the UI
User fills the form:
Data is sent to backend API
On success:
A success screen is shown with the same area
🛠 Tech Stack
Next.js (App Router)
TypeScript
Tailwind CSS
REST API Integration
📁 Project Structure
/app
  /campaigns
    /qr-coming-soon
      page.tsx
      /components
        LandingForm.tsx
        Heading.tsx
        SuccessMessage.tsx

/components
  /ui
    InputField.tsx
    Button.tsx

/services
  lead.service.ts

/types
  lead.ts
🔌 API Integration
POST /submissions

Used to submit lead data.

Request:
{
  "name": "John Doe",
  "phone": "1234567890",
  "location": "Delhi",
  "area": "sangam-vihar",
  "source": "qr"
}
Response:
{
  "success": true,
  "message": "Thank you! We'll notify you when we launch in your area."
}
⚙️ Setup Instructions

Clone the repository

git clone <your-repo-url>

Install dependencies

npm install

Run development server

npm run dev

Open in browser

http://localhost:3000/campaigns/qr-coming-soon
🌐 Deployment

The project can be deployed easily using platforms like:

Vercel (recommended for Next.js)
Netlify

After deployment, connect your domain (GoDaddy) and use QR codes with your live URLs.

🚀 Future Improvements
Admin panel to view submissions
QR scan tracking & analytics
Update/edit form for duplicate users
Better error UI (inline messages instead of alerts)
🤝 Contribution

This project is currently under development. Contributions and improvements are welcome.

📌 Note

This is a frontend-only implementation focused on lead collection and UI flow. Backend APIs are integrated but maintained separately.

💡 Author

Built with focus and learning mindset 💯
