'use client';

import React, { useState, useEffect } from 'react';
import QueryForm from '../components/QueryForm';
import QueryList from '../components/QueryList';
import { Prisma } from '@prisma/client';

export default function Home() {
  const [activeTab, setActiveTab] = useState('new');
  const [recentQueries, setRecentQueries] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch queries from your database here
    // For now, we'll use an empty array
    setRecentQueries([]);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Query Management System</h1>
            <p className="text-gray-600">Track and manage your client queries efficiently</p>
          </div>

          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('new')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'new' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  New Query
                </button>
                <button
                  onClick={() => setActiveTab('recent')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'recent' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Recent Queries
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'new' ? (
            <QueryForm />
          ) : (
            <QueryList queries={recentQueries} />
          )}
        </div>
      </div>
    </main>
  );
}
