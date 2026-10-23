'use client';
import { useState } from 'react';

export default function Home() {
  const [prefs, setPrefs] = useState('');
  const [resume, setResume] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const runCrew = async () => {
    setLoading(true);
    const res = await fetch('/api/crew', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefs, resume })
    });
    const data = await res.json();
    setResult(data.package);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20, fontFamily: 'system-ui' }}>
      <h1>RemoteGigCrew.ai</h1>
      <p>AI Crew: Scout → Tailor → Applier. Fully automated remote job packages. $19/mo USDC on Solana.</p>
      <textarea placeholder="Job prefs (remote, title, salary, location...)" value={prefs} onChange={e => setPrefs(e.target.value)} rows={4} style={{ width: '100%', margin: '10px 0' }} />
      <textarea placeholder="Paste resume" value={resume} onChange={e => setResume(e.target.value)} rows={8} style={{ width: '100%', margin: '10px 0' }} />
      <button onClick={runCrew} disabled={loading}>{loading ? 'Running Crew...' : 'Generate Package'}</button>
      {result && <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 10 }}>{result}</pre>}
      <p>Pay with Solana USDC: Connect wallet below (devnet demo). Subscribe once, agents run forever.</p>
    </div>
  );
}
