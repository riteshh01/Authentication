import { Check, X } from 'lucide-react'
import React from 'react'

const PasswordCriteria = ({ password }) => {
	const criteria = [
		{ label: 'At least 6 characters', met: password.length >= 6 },
		{ label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
		{ label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
		{ label: 'Contains a number', met: /\d/.test(password) },
		{ label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) },
	]

	return (
		<div className='mt-2 space-y-1.5'>
			{criteria.map((item) => (
				<div key={item.label} className='flex items-center gap-2 text-xs'>
					{item.met ? (
						<Check className='size-3.5 text-indigo-400 shrink-0' />
					) : (
						<X className='size-3.5 text-slate-600 shrink-0' />
					)}
					<span className={item.met ? 'text-indigo-300' : 'text-slate-500'}>{item.label}</span>
				</div>
			))}
		</div>
	)
}

const PasswordStrengthMeter = ({ password }) => {
	const getStrength = (pass) => {
		let strength = 0
		if (pass.length >= 6) strength++
		if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++
		if (pass.match(/\d/)) strength++
		if (pass.match(/[^a-zA-Z\d]/)) strength++
		return strength
	}

	const strength = getStrength(password)

	const getColor = (s) => {
		if (s === 0) return 'bg-red-600'
		if (s === 1) return 'bg-red-500'
		if (s === 2) return 'bg-amber-500'
		if (s === 3) return 'bg-indigo-400'
		return 'bg-cyan-400'
	}

	const getStrengthText = (s) => {
		if (s === 0) return 'Very Weak'
		if (s === 1) return 'Weak'
		if (s === 2) return 'Fair'
		if (s === 3) return 'Good'
		return 'Strong'
	}

	return (
		<div className='mt-3 mb-2'>
			<div className='flex justify-between items-center mb-2'>
				<span className='text-xs text-slate-500'>Password strength</span>
				<span className={`text-xs font-medium ${
					strength >= 4 ? 'text-cyan-400' : strength >= 3 ? 'text-indigo-400' : strength >= 2 ? 'text-amber-400' : 'text-red-400'
				}`}>
					{getStrengthText(strength)}
				</span>
			</div>
			<div className='flex gap-1'>
				{[...Array(4)].map((_, i) => (
					<div
						key={i}
						className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
							i < strength ? getColor(strength) : 'bg-slate-700'
						}`}
					/>
				))}
			</div>
			<PasswordCriteria password={password} />
		</div>
	)
}

export default PasswordStrengthMeter
