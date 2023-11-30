import './App.css'
import React, { useState, useEffect, useCallback, useRef } from 'react'

function App() {
    const [password, setPassword] = useState('')
    const [length, setLength] = useState(6)
    const [numberAllowed, setNumberAllowed] = useState(false)
    const [characterAllowed, setCharacterAllowed] = useState(false)

    const passwordGenerator = useCallback(() => {
        let passwordString = ''
        let alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

        if (numberAllowed) alphabets += '0123456789'
        if (characterAllowed) alphabets += '!@#$%^&*+()-[]={}'

        for (let i = 1; i <= length; i++) {
            let randomCharIndex = Math.floor(Math.random() * (alphabets.length + 1))
            passwordString += alphabets.charAt(randomCharIndex)
        }
        setPassword(passwordString)
    }, [length, numberAllowed, characterAllowed, setPassword])

    useEffect(() => {
        passwordGenerator()
    }, [length, numberAllowed, characterAllowed, passwordGenerator])

    const passwordRef = useRef(null)

    const copyToClipboard = useCallback(() => {
        window.navigator.clipboard.writeText(password)
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0, 16)
    }, [password])

    return (
        <div className='paper' style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#333333', height: '100vh' }}>
            <div className='container'>
                <h1>Password Generator</h1>
                <p>Generate Password & copy upto first 16 characters to the clipboard.</p>
                <div style={{ marginTop: '16px', marginBottom: '16px', display: 'flex' }}>
                    <input type='text' className='input' value={password} placeholder='Generated Password' ref={passwordRef} readOnly />
                    <button className='button' onClick={copyToClipboard}>
                        Copy
                    </button>
                </div>
                <div className='input-group'>
                    <div className='input-control'>
                        <input
                            type='range'
                            min={4}
                            max={48}
                            value={length}
                            onChange={(event) => {
                                setLength(event.target.value)
                            }}
                            style={{ cursor: 'pointer' }}
                        />
                        <label>Length {length}</label>
                    </div>
                    <div className='input-control'>
                        <input
                            type='checkbox'
                            className='checkbox'
                            defaultChecked={numberAllowed}
                            onChange={() => {
                                setNumberAllowed((prev) => !prev)
                            }}
                        />
                        <label>Numbers</label>
                    </div>
                    <div className='input-control'>
                        <input
                            type='checkbox'
                            className='checkbox'
                            defaultChecked={numberAllowed}
                            onChange={() => {
                                setCharacterAllowed((prev) => !prev)
                            }}
                        />
                        <label>Special Characters</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
