import { useState } from 'react'

export default function Auth({ onSignIn, onSignUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setBusy(true)
    const action = mode === 'signin' ? onSignIn : onSignUp
    const { error } = await action(email, password)
    if (error) setError(error.message)
    setBusy(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </h1>

        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-gray-700 px-3 py-2 outline-none" />

        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-gray-700 px-3 py-2 outline-none" />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button onClick={handleSubmit} disabled={busy}
          className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 py-2 font-semibold disabled:opacity-50">
          {busy ? 'Working…' : mode === 'signin' ? 'Sign in' : 'Sign up'}
        </button>

        <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="w-full text-sm text-gray-400 hover:text-gray-200">
          {mode === 'signin' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
        </button>
      </div>
    </div>
  )
}