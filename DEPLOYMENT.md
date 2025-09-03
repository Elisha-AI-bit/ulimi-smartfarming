# Deployment Guide

## Vercel Deployment

This project is ready for deployment to Vercel. Follow these steps:

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI: `npm install -g vercel`
3. In your project directory, run: `vercel`
4. Follow the prompts to link your project
5. When asked about the build command, use: `cd client && npm run build`
6. When asked about the output directory, specify: `client/build`
7. Add your environment variables in the Vercel dashboard:
   - `REACT_APP_SUPABASE_URL` - Your Supabase project URL
   - `REACT_APP_SUPABASE_ANON_KEY` - Your Supabase anon key

## Environment Variables

Before deploying, make sure to set the following environment variables in your Vercel project settings:

```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Manual Deployment

If you prefer to deploy manually:

1. Build the client application:
   ```
   cd client
   npm run build
   ```

2. The built files will be in the `client/build` directory
3. Upload these files to your hosting provider

## Supabase Configuration

Make sure your Supabase project is properly configured:

1. Import the database schema from `server/database-schema.sql`
2. Set up storage buckets for any file uploads
3. Configure Row Level Security (RLS) policies
4. Update the redirect URLs in Supabase Auth settings to match your deployed URL

## Custom Domain

To use a custom domain:

1. Add your domain in the Vercel dashboard
2. Update your DNS records as instructed by Vercel
3. Update the redirect URLs in your Supabase Auth settings to include your custom domain