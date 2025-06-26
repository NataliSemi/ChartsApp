# 🎷 Big Band Arrangement Store (Next.js)

A modern full-stack application to showcase, manage, and sell big band music arrangements.

---

## ✨ Features (Implemented)

### ✅ Public Site
- Landing page with a musical Hero section and featured arrangements.
- Arrangements listing page pulling data from MongoDB.
- Individual arrangement detail pages.
- Musical-themed loading animation.
- Google Drive-hosted PDFs linked to each arrangement.
- Buy button integrated with **Fondy** using a `POST` checkout form.
- Upload form for adding arrangements (visible via toggle on the arrangements page).

### ✅ Tech Stack
- **Next.js 13+ App Router**
- **Tailwind CSS**
- **MongoDB with Mongoose**
- **Fondy Payment Integration**
- **Google Drive** for chart storage

---

## 🛠️ Work In Progress

### 🔜 Payment & Orders
- ✅ Fondy test checkout form (basic)
- ⏳ Add order tracking & verification via `server_callback_url`
- ⏳ Create a `thank-you` page for successful payments
- ⏳ Email confirmation or download access after payment

### 🔐 Admin Portal
- ⏳ Admin authentication (email + password or magic link)
- ⏳ Admin dashboard to:
  - View and manage arrangements
  - Upload new charts (title, price, cover, Google Drive link)
  - Mark featured arrangements
  - Delete/update arrangements

### 📦 Other Planned Features
- ⏳ Fondy (optional fallback for payments)
- ⏳ PDF previews or embedded viewers
- ⏳ Download links after successful payment only
- ⏳ Customer database (names/emails of buyers)
- ⏳ Chart categories or tags (ballads, swing, etc.)
- ⏳ Mobile optimization + PWA support
- ⏳ Blog or news section for updates

---

## 📂 Folder Structure (Key Parts)

app/
arrangements/
[id]/page.tsx # Arrangement detail with payment
page.tsx # List of all arrangements
components/
Hero.tsx # Homepage banner
Loader.tsx # Musical loading animation
ArrangementUploadForm.tsx # Admin upload form
models/
Arrangement.ts # MongoDB schema for arrangements
api/
arrangements/ # REST API routes
public/
bg-music.png # Background images, etc.

MONGODB_URI=your-mongo-uri
FONDY_MERCHANT_ID=1397120
NEXT_PUBLIC_FONDY_URL=https://pay.fondy.eu/api/checkout/redirect/
