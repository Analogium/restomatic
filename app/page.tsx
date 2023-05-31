import Image from 'next/image'
import styles from './page.module.scss'
import Accueil from './accueil/Accueil'
import { supabase } from '@/api/db_connect'
import NavBar from './component/NavBar/NavBar'
import Link from 'next/link'
import { Route } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <Accueil />
    </main>
  )
}
