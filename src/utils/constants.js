// src/utils/constants.js

import { FileText, Link, User, Server, Shield, Zap, DatabaseZap, Accessibility, BarChart, CheckSquare, List, DollarSign, Puzzle, Briefcase, FileCheck, FileX, Clock } from 'lucide-react';

export const employees = ['Amila', 'Rashini', 'Janani', 'Buddhini', 'Bhanuka', 'Pramod', 'Adithya', 'Akash', 'Lasantha'];
export const priorities = ['High', 'Medium', 'Low'];
export const statuses = ['Pass', 'Fail', 'N/A'];

export const checklistData = {
  Security: {
    icon: Shield,
    subtitle: 'Vulnerabilities & protection.',
    items: [
      { text: 'Scan for malware, viruses, and other vulnerabilities in the code and database.', notes: '' },
      { text: 'Update and enforce strong password policies for all user accounts, including administrators.', notes: '' },
      { text: 'Check for Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) vulnerabilities.', notes: '' },
      { text: 'Check for SQL injection vulnerabilities in all database queries.', notes: '' },
      { text: 'Check for insecure direct object references (IDOR).', notes: '' },
      { text: 'Implement security headers such as Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), and X-Frame-Options.', notes: '' },
      { text: 'Review and secure user access roles and permissions.', notes: '' },
    ],
  },
  Performance: {
    icon: Zap,
    subtitle: 'Speed and responsiveness.',
    items: [
      { text: 'Analyze page load speed (LCP, FCP, CLS).', notes: 'e.g., Google PageSpeed Insights' },
      { text: 'Optimize images (compression, modern formats).', notes: 'e.g., WebP' },
      { text: 'Minify CSS, JavaScript, and HTML files.', notes: '' },
      { text: 'Enable Gzip compression and browser caching.', notes: '' },
      { text: 'Audit and optimize database queries.', notes: '' },
    ],
  },
  'Backup & Recovery': {
    icon: DatabaseZap,
    subtitle: 'Data safety and restoration.',
    items: [
      { text: 'Verify automated daily or weekly backups are running.', notes: '' },
      { text: 'Perform a successful test data restoration from backup.', notes: '' },
      { text: 'Confirm off-site storage for backups.', notes: '' },
      { text: 'Document the full disaster recovery procedure.', notes: '' },
    ],
  },
  'UX & Accessibility': {
    icon: Accessibility,
    subtitle: 'User-friendliness for all.',
    items: [
      { text: 'Test responsive design on mobile, tablet, and desktop.', notes: '' },
      { text: 'Ensure keyboard-only navigation is logical and complete.', notes: '' },
      { text: 'Validate color contrast meets WCAG AA standards.', notes: '' },
      { text: 'Check for proper use of ARIA roles and landmarks.', notes: '' },
      { text: 'Verify all forms have clear labels and error messages.', notes: '' },
    ],
  },
  'SEO & Analytics': {
    icon: BarChart,
    subtitle: 'Search visibility and tracking.',
    items: [
      { text: 'Verify correct implementation of Google Analytics / Tag Manager.', notes: '' },
      { text: 'Check for and fix broken internal and external links (404s).', notes: '' },
      { text: 'Ensure meta titles, descriptions, and H1 tags are optimized.', notes: '' },
      { text: 'Validate robots.txt for correct indexing rules.', notes: '' },
      { text: 'Submit and verify XML sitemap in Google Search Console.', notes: '' },
    ],
  },
  'Project Management': {
    icon: Briefcase,
    subtitle: 'Handover and documentation.',
    items: [
      { text: 'Finalize and share all project documentation.', notes: '' },
      { text: 'Provide client training on using the new system.', notes: '' },
      { text: 'Hand over all credentials and ownership securely.', notes: '' },
    ],
  },
  'Cost & Budget': {
    icon: DollarSign,
    subtitle: 'Financial planning and review.',
    items: [
      { text: 'Review hosting and domain renewal costs.', notes: '' },
      { text: 'Audit third-party service and plugin subscription fees.', notes: '' },
      { text: 'Analyze cost-benefit of current tools and platforms.', notes: '' },
    ],
  },
  'Platform Maintenance': {
    icon: Puzzle,
    subtitle: 'Updates and compatibility.',
    items: [
      { text: 'Update CMS core to the latest version (e.g., WordPress).', notes: '' },
      { text: 'Update all plugins, themes, and extensions.', notes: '' },
      { text: 'Test for compatibility issues after updates in a staging environment.', notes: '' },
    ],
  },
  'Legal & Compliance': {
    icon: FileText,
    subtitle: 'Adherence to regulations.',
    items: [
      { text: 'Ensure Privacy Policy is up-to-date and accessible.', notes: '' },
      { text: 'Verify GDPR/CCPA compliance for user data handling.', notes: '' },
      { text: 'Check that all image and content licenses are valid.', notes: '' },
    ],
  },
};

export const initialChecklistState = Object.entries(checklistData).reduce((acc, [phase, data]) => {
  acc[phase] = data.items.map((item) => ({
    ...item,
    priority: 'Medium',
    status: 'N/A',
  }));
  return acc;
}, {});