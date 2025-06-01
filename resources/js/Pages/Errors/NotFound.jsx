import React from 'react';
import { Link } from '@inertiajs/react';

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                Sorry, the page you are looking for could not be found.
            </p>
            <Link href="/" style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#4f46e5',
                color: '#fff',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: 'bold'
            }}>
                Go to Homepage
            </Link>
        </div>
    );
}
