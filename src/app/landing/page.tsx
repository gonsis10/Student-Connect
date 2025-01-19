'use client'

import { FC } from 'react';
import Head from 'next/head';
import styles from './Home.module.css';
import Link from 'next/link';


const Landing: FC = () => {


    return (
        <div className={styles.container}>
            <Head>
                <title>Student Connect</title>
                <meta name="description" content="Find your people and learn new skills on Student Connect!" />
            </Head>

            <header className={styles.header}>
                <h1 className={styles.title}>Welcome to Student Connect</h1>
                <p className={styles.description}>
                    A place where students come together to learn, grow, and connect.
                </p>
            </header>

            <main className={styles.main}>
                <section className={styles.section}>
                    <h2>Inclusive Environment</h2>
                    <p>
                        Join a diverse community of students from all walks of life. We foster an inclusive environment
                        where everyone is welcome.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Find Your People</h2>
                    <p>
                        Connect with like-minded peers who share your interests. Whether you’re looking for study
                        buddies or friends, you’ll find them here.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Learn New Skills</h2>
                    <p>
                        Engage in skill-sharing sessions, workshops, and discussions to enhance your knowledge and
                        capabilities.
                    </p>
                </section>

                <Link href="../login">
                    <button>Go to Target Page</button>
                </Link>
            </main>


            <footer className={styles.footer}>
                <p>&copy; 2025 Student Connect. All rights reserved.</p>
            </footer>
        </div>


    );
};

export default Landing;
