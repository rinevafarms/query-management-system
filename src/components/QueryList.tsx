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
      {queries.map((query) => (
        <div key={query.id} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg mb-1">{query.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{query.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Client: {query.client.name}</span>
                <span>•</span>
                <span>Reference: {query.reference}</span>
                <span>•</span>
                <span>Created: {new Date(query.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>Status: {query.status}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="btn-primary text-sm px-3 py-1">View</button>
              <button className="text-red-600 hover:text-red-700">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
