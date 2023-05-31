"useClient";

import Image from 'next/image'
import styles from './Login.module.scss'
import LoginForm from '../component/LoginForm/LoginForm'
import { supabase } from '@/api/db_connect'
import NavBar from '../component/NavBar/NavBar';


export default function Login() {


    return (
        <div >
            <NavBar />

            <LoginForm />

        </div>
    )
}