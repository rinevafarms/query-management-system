'use client';

import React, { useState, useEffect } from 'react';
import { Prisma } from '@prisma/client';

interface QueryListProps {
  queries: any[];
}

export default function QueryList({ queries }: QueryListProps) {
  return (
    <div className="space-y-4">
      {queries.map((query) => (
        <div key={query.id} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg mb-1">{query.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{query.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Client: {query.clientName}</span>
                <span>•</span>
                <span>Created: {new Date(query.createdAt).toLocaleDateString()}</span>
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
