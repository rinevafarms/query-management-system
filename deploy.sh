#!/bin/bash

# Build the application
npm run build

# Deploy to Netlify using GitHub
netlify deploy --prod --dir=.next --repo-url=https://github.com/rinevafarms/query-management-system
