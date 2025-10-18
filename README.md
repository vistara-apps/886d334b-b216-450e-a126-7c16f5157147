# Sentinel Stream

Verifiable drone inspection data, onchain, with Farcaster expert insights.

## Overview

Sentinel Stream creates a transparent, immutable, and community-verified record of industrial asset health, leveraging drone inspections and Farcaster for expert collaboration, thereby improving predictive maintenance and stakeholder trust.

## Features

- **Verified Inspection Data Feeds**: Onchain verification and timestamping of drone inspection reports
- **Anomaly Validation Frames**: Farcaster Frames for expert validation of detected anomalies
- **Gamified Inspection Challenges**: Compete to identify defects and earn rewards
- **Predictive Maintenance Futures**: Tokenized futures for asset maintenance predictions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Ethereum L2)
- **Wallet Integration**: OnchainKit
- **Social Integration**: Farcaster Mini App SDK
- **Styling**: Tailwind CSS with Coinbase theme
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `NEXT_PUBLIC_CDP_API_KEY`: Coinbase Developer Platform API key
- `NEXT_PUBLIC_PINATA_JWT`: Pinata JWT for IPFS storage
- `NEXT_PUBLIC_APP_URL`: Your app URL

## Project Structure

```
app/
├── components/       # Reusable components
├── dashboard/        # Asset dashboard
├── anomalies/        # Anomaly validation
├── challenges/       # Gamified challenges
├── futures/          # Predictive futures
└── globals.css       # Global styles

public/
└── .well-known/
    └── farcaster.json  # Farcaster manifest
```

## Base Mini App Integration

This app is built as a Base Mini App with full Farcaster integration:

- OnchainKit for wallet and identity
- MiniKit for Farcaster social features
- Gas sponsorship via Paymaster
- Frame support for social sharing

## License

MIT
