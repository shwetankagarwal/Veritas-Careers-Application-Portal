import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Building, GraduationCap, Briefcase, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.profile?.phone || '',
    address: user?.profile?.address || '',
    city: user?.profile?.city || '',
    state: user?.profile?.state || '',
    country: user?.profile?.country || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to update the profile
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Profile Settings</h1>
        <p className="text-neutral-600">Manage your account information and preferences</p>
      </div>

      {/* Profile Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-3xl font-medium">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-neutral-900">{user?.name}</h2>
              <p className="text-neutral-600">{user?.email}</p>
              <p className="text-sm text-neutral-500 mt-1">Joined January 2025</p>
            </div>
          </div>
          <Button 
            variant="outline"
            icon={isEditing ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-neutral-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    />
                  ) : (
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-neutral-500 mr-2" />
                      <span className="text-neutral-800">{formData.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-neutral-500 mr-2" />
                      <span className="text-neutral-800">{formData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-neutral-500 mr-2" />
                      <span className="text-neutral-800">{formData.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-medium text-neutral-800 mb-4">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Street Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    />
                  ) : (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-neutral-500 mr-2" />
                      <span className="text-neutral-800">{formData.address || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-neutral-500 mr-2" />
                      <span className="text-neutral-800">{formData.city || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    State/Province
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    />
                  ) : (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-neutral-500 mr-2" />
                      <span className="text-neutral-800">{formData.state || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Country
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    />
                  ) : (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-neutral-500 mr-2" />
                      <span className="text-neutral-800">{formData.country || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-neutral-800">Education</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<GraduationCap className="h-4 w-4" />}
                >
                  Add Education
                </Button>
              </div>
              <div className="bg-neutral-50 rounded-lg p-6 text-center">
                <GraduationCap className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-600">No education information added yet.</p>
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-neutral-800">Work Experience</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<Briefcase className="h-4 w-4" />}
                >
                  Add Experience
                </Button>
              </div>
              <div className="bg-neutral-50 rounded-lg p-6 text-center">
                <Briefcase className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-600">No work experience added yet.</p>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  variant="primary"
                  icon={<Save className="h-4 w-4" />}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Account Settings */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Account Settings</h2>
        
        <div className="space-y-4">
          <Button variant="outline" fullWidth>
            Change Password
          </Button>
          
          <Button variant="outline" fullWidth>
            Email Preferences
          </Button>
          
          <Button variant="danger" fullWidth>
            Delete Account
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;