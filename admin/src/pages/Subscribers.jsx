import React, { useState, useEffect } from 'react';
import { Search, Download, Mail, Trash2, UserX } from 'lucide-react';
import { subscribersAPI } from '../services/adminApi';

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('true');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    activeCount: 0,
    inactiveCount: 0,
    totalSubscribers: 0
  });

  useEffect(() => {
    fetchSubscribers();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 20,
        active: statusFilter !== 'all' ? statusFilter : undefined
      };
      
      const response = await subscribersAPI.getAll(params);
      setSubscribers(response.data.subscribers);
      setTotalPages(response.data.totalPages);
      setStats({
        activeCount: response.data.activeCount,
        inactiveCount: response.data.inactiveCount,
        totalSubscribers: response.data.totalSubscribers
      });
    } catch (error) {
      console.error('Failed to fetch subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async (subscriberId) => {
    if (!confirm('Are you sure you want to unsubscribe this user?')) return;

    try {
      await subscribersAPI.unsubscribe(subscriberId);
      fetchSubscribers();
    } catch (error) {
      console.error('Failed to unsubscribe user:', error);
      alert('Failed to unsubscribe user');
    }
  };

  const handleDelete = async (subscriberId) => {
    if (!confirm('Are you sure you want to delete this subscriber? This action cannot be undone.')) return;

    try {
      await subscribersAPI.delete(subscriberId);
      fetchSubscribers();
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
      alert('Failed to delete subscriber');
    }
  };

  const exportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Status,Subscribed Date\n"
      + subscribers.map(sub => 
          `${sub.email},${sub.active ? 'Active' : 'Inactive'},${new Date(sub.subscribedAt).toLocaleDateString()}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>
          <p className="text-gray-600">Manage newsletter subscribers</p>
        </div>
        <button
          onClick={exportSubscribers}
          className="btn-outline flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalSubscribers}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.activeCount}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unsubscribed</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.inactiveCount}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscribers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Subscribers</option>
              <option value="true">Active</option>
              <option value="false">Unsubscribed</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">
            {subscribers.length} subscribers found
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="card">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="loading-spinner w-8 h-8"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscribed Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                          <Mail className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {subscriber.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscriber.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscriber.active ? 'Active' : 'Unsubscribed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {subscriber.active && (
                          <button
                            onClick={() => handleUnsubscribe(subscriber._id)}
                            className="text-orange-600 hover:text-orange-900 flex items-center space-x-1"
                            title="Unsubscribe"
                          >
                            <UserX className="w-4 h-4" />
                            <span>Unsubscribe</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(subscriber._id)}
                          className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Subscribers;