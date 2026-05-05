import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Content } from '../../types';
import { Edit, Save, X } from 'lucide-react';

export default function AdminContent() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Content>>({});

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'content'));
      const contentData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Content));
      setContent(contentData);
    } catch (error) {
      console.error('Error loading content:', error);
      // Fallback to mock content
      setContent([
        {
          id: 'hero',
          type: 'hero',
          title: 'Welcome to Apex',
          content: 'Elite performance gear for champions',
          imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'about',
          type: 'about',
          title: 'About Apex',
          content: 'We provide the highest quality sports equipment and apparel for athletes at every level.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Content) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const handleSave = async () => {
    if (!editingId) return;

    try {
      await updateDoc(doc(db, 'content', editingId), {
        ...editData,
        updatedAt: new Date().toISOString(),
      });
      setEditingId(null);
      setEditData({});
      loadContent();
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  if (loading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Content Management</h1>
        <p className="text-gray-600">Manage website content and images</p>
      </div>

      <div className="space-y-6">
        {content.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tighter">{item.type}</h3>
                <p className="text-sm text-gray-500">Last updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
              </div>
              {editingId === item.id ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="p-2 text-green-600 hover:text-green-800"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {editingId === item.id ? (
                <>
                  {editData.title !== undefined && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded focus:border-black focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      value={editData.content}
                      onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded focus:border-black focus:outline-none"
                      rows={4}
                    />
                  </div>

                  {editData.imageUrl !== undefined && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Image URL</label>
                      <input
                        type="url"
                        value={editData.imageUrl}
                        onChange={(e) => setEditData({ ...editData, imageUrl: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded focus:border-black focus:outline-none"
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {item.title && (
                    <div>
                      <h4 className="font-medium mb-2">Title</h4>
                      <p className="text-gray-700">{item.title}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Content</h4>
                    <p className="text-gray-700">{item.content}</p>
                  </div>

                  {item.imageUrl && (
                    <div>
                      <h4 className="font-medium mb-2">Image</h4>
                      <img src={item.imageUrl} alt={item.title || item.type} className="max-w-md h-auto rounded border" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {content.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No content found</p>
        </div>
      )}
    </div>
  );
}