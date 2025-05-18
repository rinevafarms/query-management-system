'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type QueryFormData = {
  clientName: string;
  clientEmail: string;
  queryTitle: string;
  queryDescription: string;
  followUpDate?: Date;
};

export default function QueryForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<QueryFormData>();
  const [queries, setQueries] = useState<QueryFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: QueryFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save query');
      }

      const result = await response.json();
      setQueries([...queries, result.query]);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Client Name</label>
          <input 
            {...register('clientName', { required: 'Client name is required' })}
            className="w-full border p-2"
          />
          {errors.clientName && <p className="text-red-500">{errors.clientName.message}</p>}
        </div>
        
        <div>
          <label className="block">Client Email</label>
          <input 
            type="email"
            {...register('clientEmail', { 
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address"
              }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter client email"
          />
          {errors.clientEmail && <p className="mt-1 text-sm text-red-600">{errors.clientEmail.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Query Title</label>
            <input 
              {...register('queryTitle', { required: 'Query title is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter query title"
            />
            {errors.queryTitle && <p className="mt-1 text-sm text-red-600">{errors.queryTitle.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Query Description</label>
            <textarea 
              {...register('queryDescription', { required: 'Query description is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter query description"
              rows={4}
            />
            {errors.queryDescription && <p className="mt-1 text-sm text-red-600">{errors.queryDescription.message}</p>}
          </div>
        
        <div>
          <label className="block">Follow-up Date (Optional)</label>
          <input 
            type="date"
            {...register('followUpDate')}
            className="w-full border p-2"
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Query
        </button>
      </form>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Queries</h2>
        {queries.map((query, index) => (
          <div key={index} className="border p-4 mb-2">
            <p><strong>Client:</strong> {query.clientName}</p>
            <p><strong>Email:</strong> {query.clientEmail}</p>
            <p><strong>Title:</strong> {query.queryTitle}</p>
            <p><strong>Description:</strong> {query.queryDescription}</p>
          </div>
        ))}
      </section>
    </>
  );
}
