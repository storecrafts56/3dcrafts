import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, X } from 'lucide-react';
import CustomerTable from '../components/CustomerTable';
import { customersAPI } from '../services/adminApi';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, searchTerm]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 20,
        search: searchTerm
      };
      
      // Mock data since we don't have customers API endpoint
      const mockCustomers = [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+91 9876543210',
          orderCount: 5,
          totalSpent: 2500,
          createdAt: new Date('2024-01-15'),
          address: {
            street: '123 Main St',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001'
          }
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+91 9876543211',
          orderCount: 3,
          totalSpent: 1800,
          createdAt: new Date('2024-02-10'),
          address: {
            street: '456 Oak Ave',
            city: 'Delhi',
            state: 'Delhi',
            pincode: '110001'
          }
        },
        {
          _id: '3',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          phone: '+91 9876543212',
          orderCount: 8,
          totalSpent: 4200,
          createdAt: new Date('2023-12-05'),
          address: {
            street: '789 Pine Rd',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001'
          }
        }
      ];
      
      setCustomers(mockCustomers);
      setTotalPages(1);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetail(true);
  };

  const CustomerDetailModal = ({ customer, onClose }) => {
    if (!customer) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Customer Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Customer Info */}
            <div className="card p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {customer.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{customer.name}</h3>
                  <p className="text-gray-600">Customer ID: {customer._id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined:</span>
                      <span>{new Date(customer.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Order Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Orders:</span>
                      <span className="font-medium">{customer.orderCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Spent:</span>
                      <span className="font-medium text-green-600">₹{customer.totalSpent?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Order:</span>
                      <span className="font-medium">₹{Math.round(customer.totalSpent / customer.orderCount).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            {customer.address && (
              <div className="card p-4">
                <h4 className="font-medium text-gray-900 mb-2">Address</h4>
                <p className="text-gray-700">
                  {customer.address.street}<br />
                  {customer.address.city}, {customer.address.state}<br />
                  {customer.address.pincode}
                </p>
              </div>
            )}

            {/* Recent Orders */}
            <div className="card p-4">
              <h4 className="font-medium text-gray-900 mb-3">Recent Orders</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">ORD202401001</p>
                    <p className="text-sm text-gray-600">Jan 15, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹850</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Delivered
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">ORD202401002</p>
                    <p className="text-sm text-gray-600">Jan 20, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹1200</p>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Shipped
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage customer accounts and view order history</p>
        </div>
        <button className="btn-outline flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {customers.length} customers found
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="loading-spinner w-8 h-8"></div>
          </div>
        ) : (
          <CustomerTable
            customers={customers}
            onViewCustomer={handleViewCustomer}
          />
        )}
      </div>

      {/* Customer Detail Modal */}
      {showCustomerDetail && (
        <CustomerDetailModal
          customer={selectedCustomer}
          onClose={() => setShowCustomerDetail(false)}
        />
      )}
    </div>
  );
};

export default Customers;