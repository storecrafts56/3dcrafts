import React, { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit, Trash2, Upload, Save, X } from 'lucide-react';
import { homepageAPI } from '../services/adminApi';

const Homepage = () => {
  const [homepageData, setHomepageData] = useState({
    banners: [],
    videos: [],
    faqs: [],
    policies: [],
    whatsappNumber: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('banners');

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      const response = await homepageAPI.getContent();
      setHomepageData(response.data.homepage);
    } catch (error) {
      console.error('Failed to fetch homepage data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await homepageAPI.updateContent(homepageData);
      alert('Homepage content updated successfully!');
    } catch (error) {
      console.error('Failed to update homepage:', error);
      alert('Failed to update homepage content');
    } finally {
      setSaving(false);
    }
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await homepageAPI.uploadBanner(formData);
      const newBanner = {
        image: response.data.imageUrl,
        title: '',
        subtitle: '',
        link: '',
        order: homepageData.banners.length + 1
      };
      
      setHomepageData(prev => ({
        ...prev,
        banners: [...prev.banners, newBanner]
      }));
    } catch (error) {
      console.error('Failed to upload banner:', error);
      alert('Failed to upload banner image');
    }
  };

  const updateBanner = (index, field, value) => {
    setHomepageData(prev => ({
      ...prev,
      banners: prev.banners.map((banner, i) => 
        i === index ? { ...banner, [field]: value } : banner
      )
    }));
  };

  const deleteBanner = (index) => {
    setHomepageData(prev => ({
      ...prev,
      banners: prev.banners.filter((_, i) => i !== index)
    }));
  };

  const addVideo = () => {
    setHomepageData(prev => ({
      ...prev,
      videos: [...prev.videos, { url: '', title: '', description: '' }]
    }));
  };

  const updateVideo = (index, field, value) => {
    setHomepageData(prev => ({
      ...prev,
      videos: prev.videos.map((video, i) => 
        i === index ? { ...video, [field]: value } : video
      )
    }));
  };

  const deleteVideo = (index) => {
    setHomepageData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const addFAQ = () => {
    setHomepageData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '', order: prev.faqs.length + 1 }]
    }));
  };

  const updateFAQ = (index, field, value) => {
    setHomepageData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  const deleteFAQ = (index) => {
    setHomepageData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const addPolicy = () => {
    setHomepageData(prev => ({
      ...prev,
      policies: [...prev.policies, { title: '', content: '', icon: 'Shield' }]
    }));
  };

  const updatePolicy = (index, field, value) => {
    setHomepageData(prev => ({
      ...prev,
      policies: prev.policies.map((policy, i) => 
        i === index ? { ...policy, [field]: value } : policy
      )
    }));
  };

  const deletePolicy = (index) => {
    setHomepageData(prev => ({
      ...prev,
      policies: prev.policies.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homepage Management</h1>
          <p className="text-gray-600">Manage homepage content, banners, and settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'banners', label: 'Banners' },
              { id: 'videos', label: 'Videos' },
              { id: 'faqs', label: 'FAQs' },
              { id: 'policies', label: 'Policies' },
              { id: 'settings', label: 'Settings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Banners Tab */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Homepage Banners</h3>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden"
                    id="banner-upload"
                  />
                  <label
                    htmlFor="banner-upload"
                    className="btn-primary flex items-center space-x-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Banner</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {homepageData.banners.map((banner, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="relative mb-4">
                      <img
                        src={`http://localhost:5000${banner.image}`}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => deleteBanner(index)}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Banner title"
                        value={banner.title}
                        onChange={(e) => updateBanner(index, 'title', e.target.value)}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Banner subtitle"
                        value={banner.subtitle}
                        onChange={(e) => updateBanner(index, 'subtitle', e.target.value)}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Link URL"
                        value={banner.link}
                        onChange={(e) => updateBanner(index, 'link', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Featured Videos</h3>
                <button
                  onClick={addVideo}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Video</span>
                </button>
              </div>

              <div className="space-y-4">
                {homepageData.videos.map((video, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Video {index + 1}</h4>
                      <button
                        onClick={() => deleteVideo(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Video URL"
                        value={video.url}
                        onChange={(e) => updateVideo(index, 'url', e.target.value)}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Video title"
                        value={video.title}
                        onChange={(e) => updateVideo(index, 'title', e.target.value)}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={video.description}
                        onChange={(e) => updateVideo(index, 'description', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Tab */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
                <button
                  onClick={addFAQ}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-4">
                {homepageData.faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-medium text-gray-900">FAQ {index + 1}</h4>
                      <button
                        onClick={() => deleteFAQ(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Question"
                        value={faq.question}
                        onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                        className="form-input"
                      />
                      <textarea
                        placeholder="Answer"
                        value={faq.answer}
                        onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                        className="form-input"
                        rows="3"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Policies Tab */}
          {activeTab === 'policies' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Store Policies</h3>
                <button
                  onClick={addPolicy}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Policy</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {homepageData.policies.map((policy, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Policy {index + 1}</h4>
                      <button
                        onClick={() => deletePolicy(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Policy title"
                        value={policy.title}
                        onChange={(e) => updatePolicy(index, 'title', e.target.value)}
                        className="form-input"
                      />
                      <textarea
                        placeholder="Policy content"
                        value={policy.content}
                        onChange={(e) => updatePolicy(index, 'content', e.target.value)}
                        className="form-input"
                        rows="3"
                      />
                      <select
                        value={policy.icon}
                        onChange={(e) => updatePolicy(index, 'icon', e.target.value)}
                        className="form-input"
                      >
                        <option value="Shield">Shield</option>
                        <option value="Truck">Truck</option>
                        <option value="RefreshCw">Refresh</option>
                        <option value="CreditCard">Credit Card</option>
                        <option value="Phone">Phone</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
              
              <div className="max-w-md">
                <label className="form-label">WhatsApp Number</label>
                <input
                  type="text"
                  placeholder="+91 9876543210"
                  value={homepageData.whatsappNumber}
                  onChange={(e) => setHomepageData(prev => ({
                    ...prev,
                    whatsappNumber: e.target.value
                  }))}
                  className="form-input"
                />
                <p className="text-sm text-gray-600 mt-1">
                  This number will be used for the WhatsApp floating button
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;