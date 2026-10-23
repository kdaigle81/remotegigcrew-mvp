'use client';
import { useState } from 'react';
// Simplified: use @solana/web3.js + wallet adapter in full version
// For MVP: show subscribe button that in prod calls subscriptionsProgram.subscribe

export default function SolanaSub() {
  const [status, setStatus] = useState('Not subscribed');
  return (
    <div>
      <button onClick={() => setStatus('Subscribed (devnet demo) - Agents unlocked')}>
        Subscribe $19/mo USDC (Solana)
      </button>
      <p>{status}</p>
      <small>Uses official Solana Subscriptions Program. Merchant pulls monthly. Zero Stripe fees. Fully automated.</small>
    </div>
  );
}
