'use client';

import React from 'react';
import QueryForm from '../components/QueryForm';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Query Management System</h1>
      <QueryForm />
    </main>
  );
}
