import React, { useEffect, useRef, useState } from 'react';
import { 
  Briefcase, Book, Users, User, LogOut, Menu, X, 
  ChevronDown, Search, LayoutDashboard, FilePlus, 
  ClipboardCheck, BarChart3, Bell,
  QuoteIcon,
  ShieldCheck,
  Settings,
  Circle,
  FolderEdit
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItem, isAuth, removeItem } from '@/auth/tokenUtils';
import { setLoggedIn } from '../state/action-creators/profile';
import NavRouter from './NavRouter';


const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const navRef = useRef(null);
  const userMenuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(state => state?.profile?.profile?.token) || isAuth();
  const userRole = getItem('role');
  const userName = getItem('name');

  // Sync auth state
  useEffect(() => {
    const handleClickOutside = (event) => {
      //Close user profile menu if clicking outside
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(null);
      }
      const isInputClick = navRef.current?.contains(event.target);
      const isDropdownClick = event.target.closest('.nav-dropdown-container');
      if (!isInputClick && !isDropdownClick) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    dispatch(setLoggedIn(isAuth()));
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch, token]);

  // Define Navigation based on Role
  const navConfigs = {
    recruiter: [
      // {
      //   id: 'recruiter_tools',
      //   label: 'Recruiter Hub',
      //   icon: LayoutDashboard,
      //   subItems: [
      //     { id: '/recruiter/dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
      //     { id: '/recruiter/posting', label: 'Post New Job (AI)', icon: FilePlus },
      //     { id: '/recruiter/tracking', label: 'Applicant Tracking', icon: ClipboardCheck },
      //     { id: '/recruiter/reports', label: 'Analytics & Reports', icon: BarChart3 },
      //     { id: '/recruiter/managequiz', label: 'Manage Mock Tests', icon: QuoteIcon },
      //   ]
      // }
    ],
    jobseeker: [
      { id: '/exam-prep', label: 'Start Exam', icon:Briefcase },
      // {
      //   id: 'prep',
      //   label: 'Skills Prep',
      //   icon: Book,
      //   subItems: [
      //     { id: '/skills-prep/dsa', label: 'DSA Practice' },
      //     { id: '/skills-prep/system-design', label: 'System Design' },
      //   ]
      // }
    ],
    admin: [
      {
        id: 'admin_tools',
        label: 'Admin Panel',
        icon: ShieldCheck,
        // subItems: [
        //   { id: '/admin/verify-jobs', label: 'Verify Job Postings', icon: ClipboardCheck }, // This links to our new page
        //   { id: '/admin/manage-users', label: 'User Management', icon: Users },
        //   { id: '/admin/reports', label: 'Platform Analytics', icon: BarChart3 },
        //   { id: '/admin/settings', label: 'System Settings', icon: Settings },
        //   { id: '/admin/manage-demo', label: 'Manage Demo', icon: Circle },
        //   { id: '/admin/feedback', label: 'Feedabck', icon: FolderEdit },
        // ]
      }            
    ],
    guest: [
      { id: '/jobs', label: 'Browse Jobs', icon: Search },
      { id: 'prep', label: 'Skills Prep', icon: Book,
        subItems: [
          { id: '/skills-prep/dsa', label: 'DSA Practice' },
          { id: '/skills-prep/system-design', label: 'System Design' },
        ]
      },
      { id: '/login', label: 'Recruiter Portal', icon: Users, highlight: true }
    ]
  };

  const currentNavItems = token ? navConfigs[getItem('role')] : navConfigs.guest;

  const handleLogout = () => {
    dispatch(setLoggedIn(null));
    ['token', 'role', 'email', 'name'].forEach(key => removeItem(key));
    navigate('/');
  };

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.id || item.subItems?.some(s => s.id === location.pathname);
    const isOpen = openDropdown === item.id;

    return (
      <div className="relative nav-dropdown-container">
        <button
          onClick={() => item.subItems ? setOpenDropdown(isOpen ? null : item.id) : navigate(item.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
            ${isActive 
              ? (item.highlight ? 'bg-indigo-600 text-white shadow-lg' : 'bg-blue-600 text-white shadow-md') 
              : 'text-slate-600 hover:bg-slate-100'}`}
        >
          <item.icon size={18} />
          <span>{item.label}</span>
          {item.subItems && <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
        </button>

        {item.subItems && isOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
            {item.subItems.map(sub => (
              <button
                key={sub.id}
                onClick={() => { navigate(sub.id); setOpenDropdown(null); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2
                  ${location.pathname === sub.id ? 'text-blue-600 font-bold bg-blue-50' : 'text-slate-700'}`}
              >
                {sub.icon && <sub.icon size={14} />}
                {sub.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl italic">J</span>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Jobleet
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-2" ref={navRef}>
            {currentNavItems?.map(item => <NavItem key={item.id} item={item} />)}
          </div>

          {/* Actions (Right Side) */}
          <div className="flex items-center gap-3">
            {/* {token && <Bell className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors hidden sm:block" size={20} />} */}
            
            {token ? (
              <div className="relative nav-dropdown-container" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-200 hover:border-blue-300 transition-all bg-slate-50"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {getItem('name')?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 hidden sm:block">{getItem('name')}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50">
                    <button onClick={() => navigate(getItem('role') === 'recruiter' ? '/recruiters/me' : '/profile/settings')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Profile Settings</button>
                    <hr className="my-2 border-slate-100" />
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-rose-600 font-bold hover:bg-rose-50 flex items-center gap-2">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                Sign In
              </button>
            )}

            {/* Mobile Toggle */}
            <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute nav-dropdown-container top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-2xl p-4 space-y-2">
             {currentNavItems?.map(item => (
               <div key={item.id} className="space-y-1">
                 <button 
                  onClick={() => { item.subItems ? setOpenDropdown(openDropdown === item.id ? null : item.id) : setIsMenuOpen(!isMenuOpen); navigate(item.id)}}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 text-slate-700 font-semibold"
                 >
                   <div className="flex items-center gap-3"><item.icon size={20} /> {item.label}</div>
                   {item.subItems && <ChevronDown size={16} />}
                 </button>
                 {item.subItems && openDropdown === item.id && (
                   <div className="ml-8 border-l-2 border-slate-100 pl-4 space-y-1">
                     {item.subItems.map(sub => (
                       <button key={sub.id} onClick={() => { setIsMenuOpen(!isMenuOpen); navigate(sub.id)}} className="w-full text-left p-2 text-sm text-slate-600">{sub.label}</button>
                     ))}
                   </div>
                 )}
               </div>
             ))}
          </div>
        )}
      </nav>

      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <NavRouter />
      </main>
    </div>
  );
};

export default TopNavbar;