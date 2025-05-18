#!/bin/bash

# Build the application
npm run prisma:generate && npm run build

# Deploy to Netlify
netlify deploy --prod --dir=.next --build-command="npm run prisma:generate && npm run build"
