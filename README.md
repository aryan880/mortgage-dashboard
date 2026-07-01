# Mortgage Operations Dashboard

A front-end prototype for a mortgage operations dashboard built with React and Vite.

This project models an internal business workflow for client intake, mortgage application tracking, status updates, follow-up dates, notes, and simple reporting.

## Features

- New client intake form
- Required field validation
- Application status tracking
- Status filtering
- Dashboard summary metrics
- Follow-up date tracking
- Internal notes
- Delete/archive-style admin action
- Professional internal-tool UI

## Tech Stack

- React
- JavaScript
- Vite
- CSS
- Git / GitHub

## Production Improvements

This prototype currently uses React state, so data resets on refresh.

In a production version, I would add:

- Next.js API routes or server actions
- PostgreSQL or Supabase database
- Authentication
- Role-based access
- Backend validation
- Status history / audit logs
- Soft delete or archive instead of permanent deletion
- Secure deployment using environment variables

## Purpose

This project was created as a business-facing full-stack prototype to demonstrate how a mortgage team could manage client intake, application statuses, follow-ups, and reporting in a more structured internal dashboard.