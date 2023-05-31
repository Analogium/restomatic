"use client";

import { useState } from 'react';
import { supabase } from '@/api/db_connect';
import styles from './LoginForm.module.scss';
import { useRouter } from 'next/navigation';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            setError(error.message);
        } else {
            const session = supabase.auth.getSession();
            console.log('Utilisateur connecté avec Google:', (await session).data.session);
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.log('Erreur lors de la connexion:', error);
        } else {
            console.log('Utilisateur connecté:', data.user);
            await setSession(data);
            router.push('/');
        }
    };


    async function signout() {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log('Erreur lors de la déconnection de la session:', error);
        } else {
            console.log('Session déconnecté avec succès');
            router.push('/');
        }
    }

    const setSession = async (user: any) => {
        const { data, error } = await supabase.auth.setSession({
            access_token: user.session.access_token,
            refresh_token: user.session.refresh_token,
        });

        if (error) {
            console.log('Erreur lors de la configuration de la session:', error);
        } else {
            console.log('Session configurée avec succès: ', supabase.auth.getSession());
        }
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            {error && <p className={styles.error}>{error}</p>}
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="E-mail"
                required
            />
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Mot de passe"
                required
            />
            <button type="submit">Se connecter</button>
            <div className={styles.socialButtons}>
                <button onClick={handleGoogleLogin}>Se connecter avec Google</button>
                <button onClick={signout}>Se deconnecter</button>
            </div>
        </form>
    );
}

export default function LoginPage() {
    return (
        <div>
            <LoginForm />
        </div>
    );
}
