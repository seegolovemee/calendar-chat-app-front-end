// components/settings/SettingsPage.tsx
import React, { useState, useEffect } from 'react';
import { User, Camera, Bell, Lock, Globe } from 'lucide-react';

interface UserSettings {
  name: string;
  email: string;
  bio: string;
  avatar: string | null;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    weekly_summary: boolean;
  };
  language: string;
}

const defaultSettings: UserSettings = {
  name: 'Test User',
  email: 'test@example.com',
  bio: '',
  avatar: null,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  notifications: {
    email: true,
    push: true,
    weekly_summary: true,
  },
  language: 'en',
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // 从 localStorage 加载设置
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // 这里可以添加API调用
      localStorage.setItem('userSettings', JSON.stringify(settings));
      // 显示成功提示
    } catch (error) {
      // 显示错误提示
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      // 显示错误提示
      return;
    }
    // 实现密码更改逻辑
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-6">
      {/* 设置标题 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* 设置标签页 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'notifications', label: 'Notifications', icon: Bell }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 flex items-center gap-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* 个人资料设置 */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* 头像设置 */}
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                    {settings.avatar ? (
                      <img
                        src={settings.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={e => setSettings(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      value={settings.bio}
                      onChange={e => setSettings(prev => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      placeholder="Write a short bio about yourself..."
                    />
                  </div>
                </div>
              </div>

              {/* 语言和时区设置 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={e => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time Zone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={e => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 安全设置 */}
          {activeTab === 'security' && (
            <div className="max-w-md space-y-6">
              <h3 className="text-lg font-medium">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={e => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={e => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={e => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <button
                  onClick={handlePasswordChange}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* 通知设置 */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={settings.notifications.email}
                    onChange={e => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: e.target.checked }
                    }))}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="emailNotifications" className="font-medium">
                      Email Notifications
                    </label>
                    <p className="text-sm text-gray-500">
                      Receive email notifications about your account activity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="pushNotifications"
                    checked={settings.notifications.push}
                    onChange={e => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, push: e.target.checked }
                    }))}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="pushNotifications" className="font-medium">
                      Push Notifications
                    </label>
                    <p className="text-sm text-gray-500">
                      Receive push notifications in your browser.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="weeklySummary"
                    checked={settings.notifications.weekly_summary}
                    onChange={e => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, weekly_summary: e.target.checked }
                    }))}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="weeklySummary" className="font-medium">
                      Weekly Summary
                    </label>
                    <p className="text-sm text-gray-500">
                      Receive a weekly summary of your activity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;