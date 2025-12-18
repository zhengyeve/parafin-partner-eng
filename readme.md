# Parafin Embedded Widget — README

A minimal Node.js + React app to showcase the Parafin embedded widget UI with its different states. 

## Contents
- server/ — Express API that mints widget session tokens (server-side secret)
- src/ — Create React App frontend that hosts the widget
- README.md — this file

## Prerequisites
- Access to a [Parafin dashboard](https://dashboard.parafin.com)
- [Node.js](https://nodejs.org/en/)


## Instruction (local)
### 1. Clone repo, install dependency
- git clone <repo-url>
- cd <repo-root>
- run `npm instsall`

```bash
$ npm install
```

### 2. Fetch and include API keys

Navigate to the [Settings > API keys](https://dashboard.parafin.com/settings/api-keys) in your Parafin dashboard and fetch your sandbox Client ID and Client secret.

Rename the `sample.env` file to `.env` and populate with your Client ID and Client secret.

```bash
$ mv sample.env .env
```

```bash
# .env
PARAFIN_CLIENT_ID="<your-client-id>"
PARAFIN_CLIENT_SECRET="<your-client-secret>"
```
### 3. Run app

You're now ready to run the app and check out your embedded offer!

In the project directory, run:

```bash
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app with an embedded Parafin Widget in your browser.


## Features

### 1. Preview Embedded Widget UI given a personId
- Go to "View Widget for Existing Person" tab (default screen)
- Input `"person_id"` obtained from sample offer creation or REST API endpoints, hit "Apply"
- Observe that the embedded widget UI changes based on status of the person's offer/application


### 2. Create new business/person and preview widget UI with "No Offer Avaialble" state
- Go to "Manual Update" tab
- Click on "Initialize Business and Person without Offer" button
- Copy `"person_id"` from the response block
- Go back to "View Widget for Existing Person" tab, paste the copied "person_id" to the "Display Embedded Widget for a different Person ID" input, hit "Apply"
- Observe that the embedded widget now shows "No offer available yet" state


### 3. Create Pre-approved offer for new business 
- Go to "Manual Update" tab
- Click on "Make New Pre-approved Offer" button. This will generate a pre-approved flex-loan offer using default values, similar to the one in Dashboard sandbox.
- Copy `"data.person.id"` from the response block.
- Go back to "View Widget for Existing Person" tab, paste the copied "person_id" to the "Display Embedded Widget for a different Person ID" input, hit "Apply"
- Observe that the embeeded widget now shows "Pre-approved offer available" state, user can accept the offer with application.
- Go into the embedded widget, and finish application process (can use dummy data for birthday, SSN, TIN) and accept offer.
- Observe that the embeeded widget now shows "Capital on its way" state
- Go to "Manual Update" tab, click on "Fund Capital for Current Offer" button, this will manually mark the capital product as funded.
- Go back to "View Widget for Existing Person" tab, observe that the embedded widget is in "Outstanding balance" state.

