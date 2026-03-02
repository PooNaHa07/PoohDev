"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Trash2, Edit2, LogIn, Save, X, 
  LayoutDashboard, Award as AwardIcon, Briefcase, 
  LogOut, ChevronRight, Image as ImageIcon, Link as LinkIcon,
  Type, Calendar, User, Loader2
} from "lucide-react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface Award {
  id: number;
  title: string;
  issuer: string;
  year: string;
  image: string;
}

interface PortfolioData {
  projects: Project[];
  awards: Award[];
}

type TabType = "projects" | "awards";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [data, setData] = useState<PortfolioData>({ projects: [], awards: [] });
  const [editingItem, setEditingItem] = useState<(any & { type: TabType }) | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/portfolio');
      const json = await res.json();
      if (json.error) {
        alert(`Database Error: ${json.details || json.error}`);
        setData({ projects: [], awards: [] });
      } else {
        setData(json);
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      alert('Failed to connect to the internal API');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "1234";
    if (passcode === correctPasscode) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect passcode");
    }
  };

  const saveData = async (newData: PortfolioData) => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (res.ok) {
        setData(newData);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Failed to save data:', error);
      alert('Failed to save changes');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = (id: number, type: TabType) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const newData = { ...data };
    newData[type] = (newData[type] as any[]).filter(item => item.id !== id);
    saveData(newData);
  };

  const handleEdit = (item: any, type: TabType) => {
    setEditingItem({ ...item, type });
  };

  const handleAdd = (type: TabType) => {
    const newItem = {
      id: Date.now(),
      title: "Title",
      description: type === "projects" ? "Service Description" : undefined,
      issuer: type === "awards" ? "Issuer Name" : undefined,
      year: type === "awards" ? "2024" : undefined,
      image: type === "projects" ? "/projects/icu-dashboard.png" : "/awards/web-cert.png",
      tags: type === "projects" ? ["Tag"] : undefined,
      link: type === "projects" ? "#" : undefined,
      type
    };
    setEditingItem(newItem);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    const newData = { ...data };
    const { type, ...item } = editingItem;
    const index = (newData[type as TabType] as any[]).findIndex(i => i.id === item.id);
    
    if (index > -1) {
      (newData[type as TabType] as any[])[index] = item;
    } else {
      (newData[type as TabType] as any[]).push(item);
    }
    saveData(newData);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(249, 115, 22, 0.1)', filter: 'blur(120px)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(234, 88, 12, 0.1)', filter: 'blur(120px)', borderRadius: '50%' }} />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          style={{ 
            position: 'relative', 
            zIndex: 10, 
            width: '100%', 
            maxWidth: '400px', 
            padding: '2.5rem', 
            borderRadius: '32px', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--primary)', marginBottom: '1.5rem', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
              <LayoutDashboard size={32} />
            </div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>PoohDev Admin</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Please enter your secure passcode</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input
              type="password"
              placeholder="Passcode"
              style={{ 
                width: '100%', 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                borderRadius: '16px', 
                padding: '1rem', 
                color: '#fff', 
                textAlign: 'center', 
                letterSpacing: '0.5em', 
                fontSize: '1.25rem',
                outline: 'none'
              }}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
              style={{ padding: '1rem', borderRadius: '16px', width: '100%', fontSize: '1rem', fontWeight: 700 }}
            >
              <LogIn size={20} style={{ marginRight: '0.75rem' }} /> Access Portal
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
      {/* Header */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 60, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="container" style={{ height: '80px', display: 'flex', justifyContent: 'between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(249, 115, 22, 0.3)' }}>
              <span style={{ fontWeight: 700, color: '#white' }}>P</span>
            </div>
            <div>
              <h1 style={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1.2 }}>PoohDev Central</h1>
              <p style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Administrator</p>
            </div>
          </div>

          <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '0.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <button 
              onClick={() => setActiveTab("projects")} 
              style={{ 
                padding: '0.5rem 1.5rem', 
                borderRadius: '8px', 
                fontSize: '0.875rem', 
                fontWeight: 600, 
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: 'none',
                background: activeTab === 'projects' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'projects' ? '#white' : 'var(--text-secondary)'
              }}
            >
              <Briefcase size={16} /> Projects
            </button>
            <button 
              onClick={() => setActiveTab("awards")} 
              style={{ 
                padding: '0.5rem 1.5rem', 
                borderRadius: '8px', 
                fontSize: '0.875rem', 
                fontWeight: 600, 
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: 'none',
                background: activeTab === 'awards' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'awards' ? '#white' : 'var(--text-secondary)'
              }}
            >
              <AwardIcon size={16} /> Awards
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
            <button 
              onClick={() => setIsAuthenticated(false)}
              style={{ padding: '0.75rem', borderRadius: '12px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', transition: 'all 0.3s' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#ef4444')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'capitalize' }}>{activeTab} Management</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Manage your showcase content stored on Supabase Cloud</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAdd(activeTab)} 
              style={{ background: '#fff', color: '#000', padding: '1rem 2rem', borderRadius: '16px', fontWeight: 700, border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
            >
              <Plus size={20} /> Create New
            </motion.button>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 0', gap: '1rem' }}>
            <Loader2 className="animate-spin" size={40} style={{ color: 'var(--primary)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Retrieving your data...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            <AnimatePresence mode="popLayout">
              {data[activeTab].map((item: any) => (
                <motion.div 
                  key={item.id} 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{ position: 'relative', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.05)', transition: 'all 0.3s' }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; }}
                >
                  <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden', background: 'rgba(255, 255, 255, 0.05)' }}>
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                    <div style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', 
                      display: 'flex', 
                      alignItems: 'end', 
                      padding: '1.5rem',
                      opacity: 0,
                      transition: 'opacity 0.3s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.opacity = '1'; }}
                    onMouseOut={(e) => { e.currentTarget.style.opacity = '0'; }}
                    >
                       <button onClick={() => handleEdit(item, activeTab)} className="btn-primary" style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Edit2 size={16} /> Quick Edit
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
                      <button 
                        onClick={() => handleDelete(item.id, activeTab)} 
                        style={{ padding: '0.5rem', borderRadius: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', transition: 'all 0.3s' }}
                        onMouseOver={(e) => (e.currentTarget.style.color = '#ef4444')}
                        onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.5rem', height: '2.6rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {item.description || item.issuer || "No description provided"}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(249, 115, 22, 0.5)' }}>
                      <span>ID: {item.id}</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Dynamic Edit Modal */}
      <AnimatePresence>
        {editingItem && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 30 }}
              style={{ background: '#111', borderRadius: '40px', width: '100%', maxWidth: '750px', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column' }}
            >
              {/* Modal Header */}
              <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Manage Content</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{editingItem.type.slice(0, -1)} entry</p>
                </div>
                <button 
                  onClick={() => setEditingItem(null)} 
                  style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)', border: 'none', color: '#fff', borderRadius: '16px', transition: 'all 0.3s' }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Form */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                <form id="edit-form" onSubmit={handleSaveEdit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                       <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Type size={12} /> Title
                      </label>
                      <input 
                        className="form-input"
                        style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', margin: 0 }}
                        value={editingItem.title} 
                        onChange={e => setEditingItem({...editingItem, title: e.target.value})} 
                        required 
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ImageIcon size={12} /> Image URL
                      </label>
                      <input 
                        className="form-input"
                        style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', margin: 0 }}
                        value={editingItem.image} 
                        onChange={e => setEditingItem({...editingItem, image: e.target.value})} 
                        required 
                      />
                    </div>
                    
                    {editingItem.type === 'awards' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <User size={12} /> Issuer
                        </label>
                        <input 
                          className="form-input"
                          style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', margin: 0 }}
                          value={editingItem.issuer} 
                          onChange={e => setEditingItem({...editingItem, issuer: e.target.value})} 
                        />
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {editingItem.type === 'awards' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Calendar size={12} /> Year
                        </label>
                        <input 
                          className="form-input"
                          style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', margin: 0 }}
                          value={editingItem.year} 
                          onChange={e => setEditingItem({...editingItem, year: e.target.value})} 
                        />
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <LinkIcon size={12} /> Project Link
                          </label>
                          <input 
                            className="form-input"
                            style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', margin: 0 }}
                            value={editingItem.link} 
                            onChange={e => setEditingItem({...editingItem, link: e.target.value})} 
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Tags</label>
                          <input 
                            className="form-input"
                            style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', margin: 0 }}
                            placeholder="Next.js, UI/UX, AI..."
                            value={(editingItem.tags || []).join(', ')} 
                            onChange={e => setEditingItem({...editingItem, tags: e.target.value.split(',').map((t: string) => t.trim())})} 
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {editingItem.type === 'projects' && (
                    <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Detailed Description</label>
                      <textarea 
                        className="form-input"
                        style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '24px', margin: 0, minHeight: '120px' }}
                        value={editingItem.description} 
                        onChange={e => setEditingItem({...editingItem, description: e.target.value})} 
                      />
                    </div>
                  )}
                </form>
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => setEditingItem(null)}
                  style={{ flex: 1, padding: '1rem', borderRadius: '16px', fontWeight: 700, background: 'rgba(255, 255, 255, 0.05)', border: 'none', color: '#fff', transition: 'all 0.3s' }}
                >
                  Cancel
                </button>
                <button 
                  form="edit-form"
                  disabled={isSyncing}
                  className="btn-primary"
                  style={{ flex: 2, padding: '1rem', borderRadius: '16px', fontWeight: 700, fontSize: '1rem' }}
                >
                  {isSyncing ? <Loader2 className="animate-spin" /> : <Save size={20} style={{ marginRight: '0.5rem' }} />}
                  {isSyncing ? "Syncing..." : "Save Database"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Syncing Indicator */}
      <AnimatePresence>
        {isSyncing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{ position: 'fixed', bottom: '2.5rem', right: '2.5rem', zIndex: 1000, background: '#fff', color: '#000', padding: '1rem 1.5rem', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, border: '1px solid var(--primary)' }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Loader2 size={18} className="animate-spin" style={{ color: '#fff' }} />
            </div>
            <span>Syncing with Supabase Cloud...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
