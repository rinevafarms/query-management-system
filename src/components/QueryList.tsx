'use client';

import React, { useState, useEffect } from 'react';
import { Prisma } from '@prisma/client';

interface QueryListProps {
  queries: {
    id: string;
    title: string;
    description: string;
    status: string;
    reference: string;
    createdAt: Date;
    updatedAt: Date;
    followUpDate: Date | null;
    client: {
      id: string;
      name: string;
      email: string;
    };
  }[];
}

export default function QueryList() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await fetch('/api/queries');
      if (!response.ok) {
        throw new Error('Failed to fetch queries');
      }
      const data = await response.json();
      setQueries(data.queries);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load queries');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading queries...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (queries.length === 0) {
    return <div className="text-center text-gray-500 py-8">No queries found</div>;
  }

  return (
    <div className="space-y-4">
      {queries.map((query, index) => (
        <div key={index} className="border p-4 mb-2">
          <p><strong>Client:</strong> {query.client.name}</p>
          <p><strong>Email:</strong> {query.client.email}</p>
          <p><strong>Title:</strong> {query.title}</p>
          <p><strong>Description:</strong> {query.description}</p>
        </div>
      ))}
    </div>
  );
}
