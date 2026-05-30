import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Placeholder component to display details of a specific service based on its slug.
 * In a real application, this component would fetch and display actual service data.
 */
const ServiceDetail = () => {
  const { serviceSlug } = useParams();

  return (
    <div className="min-h-screen bg-[#f6f6f8] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-black text-slate-900 mb-3">Service Detail Page</h2>
      <p className="text-slate-600 mb-10 max-w-sm">
        Displaying details for service: <span className="font-bold text-[#135bec]">{serviceSlug}</span>
      </p>
      <p className="text-sm text-slate-500">
        (This is a placeholder page. You would fetch service data here from your API using the slug.)
      </p>
    </div>
  );
};

export default ServiceDetail;