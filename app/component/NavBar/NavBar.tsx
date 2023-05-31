"use client";

import Image from 'next/image';
import styles from './NavBar.module.scss';
import logo_restomatic from '../../images/logo_restomatic.png';
import { AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/api/db_connect';
import { Session } from '@supabase/supabase-js';

export default function NavBar() {
  const [session, setSession] = useState<Session | null>(null);
  const [avatar, setAvatar] = useState(null);


  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    setAvatar(session?.user.user_metadata.avatar_url);
  }, [session]);

  async function getSession() {
    const sess = (await supabase.auth.getSession()).data.session;

    setSession(sess);

    if (sess && hasGoogleProvider(sess.user.identities)) {
      setAvatar(sess.user.user_metadata.avatar_url);
    }
  }

  function hasGoogleProvider(arr: any): boolean {
    for (const item of arr) {
      if (item.provider === "google") {
        return true;
      }
    }
    return false;
  }
  


  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <div className={styles.imageWrapper}>
          <Image src={logo_restomatic} alt="logo" width={120} height={100} />
        </div>
      </div>
      <span className={styles.title}><a href="/">Resto'matic</a></span>
      <ul className={styles.navlinks}>
        <li>
          <Link href="/" legacyBehavior>
            <a>Accueil</a>
          </Link>
        </li>
        <li><a href="#">Chercher</a></li>
        <li><a href="#">Contact</a></li>
        <li>
          <Link href="/login" legacyBehavior>
            <a>
              <span>
                {avatar ? <Image src={avatar} alt='avatar' width={30} height={30}/> : <AiOutlineUser size={30} />}
              </span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
