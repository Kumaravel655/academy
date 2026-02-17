export function initializeDemoAccount() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if demo account already exists
  const demoExists = users.some((u: any) => u.email === 'demo@velandev.com');
  
  if (!demoExists) {
    const demoUser = {
      id: 'demo-user-001',
      email: 'demo@velandev.com',
      password: 'demo123',
      name: 'Demo User',
      createdAt: new Date().toISOString(),
    };
    
    users.push(demoUser);
    localStorage.setItem('users', JSON.stringify(users));
  }
}
