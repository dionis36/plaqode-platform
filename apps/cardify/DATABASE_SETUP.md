# Cardify Database Setup Guide

## ✅ Database Status

Your Cardify database is **ready** with:
- ✅ PostgreSQL connection configured
- ✅ Prisma migrations applied
- ✅ Template model created

## 🎯 How to Load Templates from Database

Cardify has **TWO** ways to load templates:

### 1. **File-Based Loading** (Current - Default)
Located in `lib/templates.ts` - loads from JSON files in `public/templates/`

### 2. **Database Loading** (Recommended - Already Implemented!)
API endpoints are already created in `app/api/templates/`

## 🚀 Steps to Activate Database Template Loading

### Step 1: Import Templates to Database

Run the import script to load all templates from files into the database:

\`\`\`bash
cd c:\\Users\\DIO\\Documents\\PROJECT21\\cardify-5
npm run import-templates
\`\`\`

This will:
- ✅ Read all JSON files from `public/templates/`
- ✅ Import them into the PostgreSQL database
- ✅ Show import summary

### Step 2: Update Template Loading

The app already has API endpoints for database templates:
- \`GET /api/templates\` - List all templates
- \`GET /api/templates/[id]\` - Get single template
- \`GET /api/templates/categories\` - Get templates by category

**To use database loading, update the landing page:**

**File:** \`app/(landing)/page.tsx\`

Change from:
\`\`\`tsx
import { loadTemplates } from '@/lib/templates';
const templates = loadTemplates(); // File-based
\`\`\`

To:
\`\`\`tsx
// Fetch from database API
const response = await fetch('/api/templates');
const data = await response.json();
const templates = data.templates;
\`\`\`

### Step 3: Update Editor Page

**File:** \`app/(editor)/design/[templateId]/page.tsx\`

Change from:
\`\`\`tsx
import { loadTemplate } from '@/lib/templates';
const template = loadTemplate(templateId); // File-based
\`\`\`

To:
\`\`\`tsx
// Fetch from database API
const response = await fetch(\`/api/templates/\${templateId}\`);
const data = await response.json();
const template = data.template;
\`\`\`

## 📋 Quick Setup Commands

\`\`\`bash
# 1. Make sure database is running
# PostgreSQL should be running on localhost:5432

# 2. Navigate to Cardify
cd c:\\Users\\DIO\\Documents\\PROJECT21\\cardify-5

# 3. Apply migrations (if not done)
npx prisma migrate deploy

# 4. Import templates to database
npm run import-templates

# 5. Verify templates in database
npx prisma studio
# Opens Prisma Studio at http://localhost:5555
# Check the "templates" table
\`\`\`

## 🔍 Verify Database Templates

### Option 1: Using Prisma Studio
\`\`\`bash
npx prisma studio
\`\`\`
- Opens at \`http://localhost:5555\`
- Click on "templates" table
- You should see all 29 templates

### Option 2: Using API
\`\`\`bash
# Start Cardify
npm run dev

# In another terminal or browser:
curl http://localhost:3002/api/templates
\`\`\`

## 📊 Database vs File-Based Comparison

| Feature | File-Based | Database |
|---------|-----------|----------|
| **Speed** | Fast (static) | Fast (indexed) |
| **Admin Panel** | ❌ No | ✅ Yes |
| **Dynamic Updates** | ❌ Requires restart | ✅ Real-time |
| **Search/Filter** | Limited | ✅ Advanced |
| **User Templates** | ❌ No | ✅ Yes |
| **Current Status** | ✅ Active | ⚠️ Ready (not active) |

## 🎨 Benefits of Database Loading

1. **Admin Panel** - Manage templates via UI
2. **User Templates** - Users can save custom templates
3. **Dynamic Categories** - Add/edit categories without code
4. **Search & Filter** - Advanced template discovery
5. **Analytics** - Track template usage
6. **Versioning** - Template version control

## ⚠️ Important Notes

1. **Both systems work** - You can keep file-based or switch to database
2. **No data loss** - Import script preserves all template data
3. **Backwards compatible** - File-based still works if needed
4. **Performance** - Database is optimized with indexes

## 🔄 Switching Between Systems

### Keep File-Based (Current):
- No changes needed
- Templates load from \`public/templates/\`

### Switch to Database:
1. Run \`npm run import-templates\`
2. Update landing page to use \`/api/templates\`
3. Update editor page to use \`/api/templates/[id]\`

## 📝 Next Steps

**Recommended:**
1. ✅ Import templates: \`npm run import-templates\`
2. ✅ Verify in Prisma Studio
3. ✅ Test API endpoints
4. ⏭️ Decide: Keep file-based or switch to database

**For now, templates will continue loading from files until you update the code to use the API endpoints.**

---

**Need help switching to database loading? Let me know and I'll update the code!**
