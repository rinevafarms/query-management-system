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

  const onSubmit = (data: QueryFormData) => {
    setQueries([...queries, data]);
    reset(); // Clear form after submission
    // TODO: Implement actual submission to backend
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
            className="w-full border p-2"
          />
          {errors.clientEmail && <p className="text-red-500">{errors.clientEmail.message}</p>}
        </div>
        
        <div>
          <label className="block">Query Title</label>
          <input 
            {...register('queryTitle', { required: 'Query title is required' })}
            className="w-full border p-2"
          />
          {errors.queryTitle && <p className="text-red-500">{errors.queryTitle.message}</p>}
        </div>
        
        <div>
          <label className="block">Query Description</label>
          <textarea 
            {...register('queryDescription', { required: 'Query description is required' })}
            className="w-full border p-2"
          />
          {errors.queryDescription && <p className="text-red-500">{errors.queryDescription.message}</p>}
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
