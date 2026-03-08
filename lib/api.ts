/**
 * API client for connecting the Next.js frontend to the FastAPI backend.
 * Handles snake_case → camelCase conversion and JWT auth headers.
 */

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4566';

// ── Key transformation ──

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

/**
 * Recursively convert all object keys from snake_case to camelCase.
 * Also converts numeric `id` / `courseId` / `userId` fields to strings
 * for frontend type compatibility.
 */
export function transformKeys(obj: any): any {
  if (Array.isArray(obj)) return obj.map(transformKeys);
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => {
        const camelKey = snakeToCamel(key);
        // Convert id-like numeric fields to strings for frontend compat
        if (
          (camelKey === 'id' || camelKey === 'courseId' || camelKey === 'userId') &&
          typeof val === 'number'
        ) {
          return [camelKey, String(val)];
        }
        return [camelKey, transformKeys(val)];
      }),
    );
  }
  return obj;
}

// ── camelCase → snake_case for outgoing payloads ──

function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

function camelToSnakeKeys(obj: any): any {
  if (Array.isArray(obj)) return obj.map(camelToSnakeKeys);
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [camelToSnake(key), camelToSnakeKeys(val)])
    );
  }
  return obj;
}

// ── Internal fetch helper ──

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

async function apiFetch<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || 'Request failed');
  }

  if (res.status === 204) return null as T;

  const data = await res.json();
  return transformKeys(data) as T;
}

// ── Public API ──

export const api = {
  // Auth
  auth: {
    signup: (email: string, password: string, name: string) =>
      apiFetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      }),
    login: (email: string, password: string) =>
      apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: () => apiFetch('/api/auth/me'),
  },

  // Courses
  courses: {
    list: (params?: { category?: string; level?: string; search?: string }) => {
      const query = new URLSearchParams();
      if (params?.category) query.set('category', params.category);
      if (params?.level) query.set('level', params.level);
      if (params?.search) query.set('search', params.search);
      const qs = query.toString();
      return apiFetch(`/api/courses${qs ? `?${qs}` : ''}`);
    },
    get: (slug: string) => apiFetch(`/api/courses/${slug}`),
    categories: () => apiFetch<string[]>('/api/courses/categories'),
    create: (data: any) =>
      apiFetch('/api/courses', { method: 'POST', body: JSON.stringify(camelToSnakeKeys(data)) }),
    update: (courseId: number, data: any) =>
      apiFetch(`/api/courses/${courseId}`, { method: 'PUT', body: JSON.stringify(camelToSnakeKeys(data)) }),
    delete: (courseId: number) =>
      apiFetch(`/api/courses/${courseId}`, { method: 'DELETE' }),
  },

  // Enrollments
  enrollments: {
    list: () => apiFetch('/api/enrollments'),
    enroll: (courseId: string) =>
      apiFetch(`/api/enrollments/${parseInt(courseId)}`, { method: 'POST' }),
    unenroll: (courseId: string) =>
      apiFetch(`/api/enrollments/${parseInt(courseId)}`, { method: 'DELETE' }),
    updateProgress: (courseId: string, progress: number) =>
      apiFetch(`/api/enrollments/${parseInt(courseId)}/progress`, {
        method: 'PATCH',
        body: JSON.stringify({ progress }),
      }),
  },

  // Wishlist
  wishlist: {
    list: () => apiFetch('/api/wishlist'),
    add: (courseId: string) =>
      apiFetch(`/api/wishlist/${parseInt(courseId)}`, { method: 'POST' }),
    remove: (courseId: string) =>
      apiFetch(`/api/wishlist/${parseInt(courseId)}`, { method: 'DELETE' }),
  },

  // Contact
  contact: {
    submit: (data: { name: string; email: string; subject: string; message: string }) =>
      apiFetch('/api/contact', { method: 'POST', body: JSON.stringify(data) }),
  },

  // Admin
  admin: {
    stats: () => apiFetch('/api/admin/stats'),
    instructors: async () => {
      const data = await apiFetch('/api/admin/instructors');
      // Map 'coursesCount' → 'courses' for frontend compatibility
      return (data as any[]).map((i) => ({ ...i, courses: i.coursesCount }));
    },
  },
};
