import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Component } from './component/component'
import { auth } from './screen/firebase'


export const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login')
            }
        })
    }, [])
    return (

        <Component>

            <h2>home</h2>

        </Component>
    )
}
