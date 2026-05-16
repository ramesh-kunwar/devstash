export const mockUser = {
  id: 'user_1',
  name: 'John Doe',
  email: 'john@example.com',
  image: null,
  isPro: true,
}

export const mockItemTypes = [
  { id: 'type_snippet', name: 'snippet', icon: 'Code', color: '#3b82f6', isSystem: true },
  { id: 'type_prompt', name: 'prompt', icon: 'Sparkles', color: '#8b5cf6', isSystem: true },
  { id: 'type_command', name: 'command', icon: 'Terminal', color: '#f97316', isSystem: true },
  { id: 'type_note', name: 'note', icon: 'StickyNote', color: '#fde047', isSystem: true },
  { id: 'type_file', name: 'file', icon: 'File', color: '#6b7280', isSystem: true },
  { id: 'type_image', name: 'image', icon: 'Image', color: '#ec4899', isSystem: true },
  { id: 'type_link', name: 'link', icon: 'Link', color: '#10b981', isSystem: true },
]

export const mockCollections = [
  {
    id: 'col_1',
    name: 'React Patterns',
    description: 'Common React patterns and hooks',
    isFavorite: true,
    itemCount: 12,
    defaultTypeId: 'type_snippet',
  },
  {
    id: 'col_2',
    name: 'Python Snippets',
    description: 'Useful Python code snippets',
    isFavorite: false,
    itemCount: 8,
    defaultTypeId: 'type_snippet',
  },
  {
    id: 'col_3',
    name: 'Context Files',
    description: 'AI context files for projects',
    isFavorite: true,
    itemCount: 5,
    defaultTypeId: 'type_file',
  },
  {
    id: 'col_4',
    name: 'Interview Prep',
    description: 'Technical interview preparation',
    isFavorite: true,
    itemCount: 24,
    defaultTypeId: 'type_note',
  },
  {
    id: 'col_5',
    name: 'Git Commands',
    description: 'Frequently used git commands',
    isFavorite: true,
    itemCount: 15,
    defaultTypeId: 'type_command',
  },
  {
    id: 'col_6',
    name: 'AI Prompts',
    description: 'Curated AI prompts for coding',
    isFavorite: false,
    itemCount: 18,
    defaultTypeId: 'type_prompt',
  },
  {
    id: 'col_7',
    name: 'Python Snippets',
    description: 'Useful Python code snippets',
    isFavorite: false,
    itemCount: 8,
    defaultTypeId: 'type_snippet',
  },
  {
    id: 'col_8',
    name: 'Interview Prep',
    description: 'Technical interview preparation',
    isFavorite: false,
    itemCount: 24,
    defaultTypeId: 'type_note',
  },
  {
    id: 'col_9',
    name: 'AI Prompts',
    description: 'Curated AI prompts for coding',
    isFavorite: false,
    itemCount: 18,
    defaultTypeId: 'type_prompt',
  },
]

export const mockItems = [
  {
    id: 'item_1',
    title: 'useAuth Hook',
    contentType: 'TEXT' as const,
    content: `import { useSession } from 'next-auth/react'

export function useAuth() {
  const { data: session, status } = useSession()
  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  }
}`,
    description: 'Custom authentication hook for React applications',
    language: 'typescript',
    isFavorite: false,
    isPinned: true,
    itemTypeId: 'type_snippet',
    tags: ['react', 'auth', 'hooks'],
    collectionIds: ['col_1'],
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'item_2',
    title: 'API Error Handling Pattern',
    contentType: 'TEXT' as const,
    content: `async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      return res
    } catch (err) {
      if (i === retries - 1) throw err
      await new Promise(r => setTimeout(r, 2 ** i * 1000))
    }
  }
  throw new Error('Unreachable')
}`,
    description: 'Fetch wrapper with exponential backoff retry logic',
    language: 'typescript',
    isFavorite: false,
    isPinned: true,
    itemTypeId: 'type_snippet',
    tags: ['api', 'error-handling', 'typescript'],
    collectionIds: ['col_1'],
    createdAt: '2025-01-12T00:00:00Z',
    updatedAt: '2025-01-12T00:00:00Z',
  },
  {
    id: 'item_3',
    title: 'Code Review Prompt',
    contentType: 'TEXT' as const,
    content: `Review the following code for:
1. Security vulnerabilities
2. Performance issues
3. Code clarity and maintainability
4. Edge cases not handled

Provide specific, actionable feedback with examples where relevant.`,
    description: 'Prompt for thorough code reviews',
    language: null,
    isFavorite: true,
    isPinned: false,
    itemTypeId: 'type_prompt',
    tags: ['code-review', 'ai'],
    collectionIds: ['col_6'],
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'item_4',
    title: 'git reset --hard HEAD~1',
    contentType: 'TEXT' as const,
    content: 'git reset --hard HEAD~1',
    description: 'Undo last commit and discard all changes',
    language: 'bash',
    isFavorite: false,
    isPinned: false,
    itemTypeId: 'type_command',
    tags: ['git', 'reset'],
    collectionIds: ['col_5'],
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
  },
  {
    id: 'item_5',
    title: 'Python List Comprehension',
    contentType: 'TEXT' as const,
    content: `# Filter and transform in one line
squares = [x**2 for x in range(10) if x % 2 == 0]

# Nested list comprehension
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]`,
    description: 'Common list comprehension patterns in Python',
    language: 'python',
    isFavorite: false,
    isPinned: false,
    itemTypeId: 'type_snippet',
    tags: ['python', 'list-comprehension'],
    collectionIds: ['col_2', 'col_7'],
    createdAt: '2025-01-05T00:00:00Z',
    updatedAt: '2025-01-05T00:00:00Z',
  },
  {
    id: 'item_6',
    title: 'Big O Cheatsheet',
    contentType: 'TEXT' as const,
    content: `O(1)   - Constant  - Array access, hash lookup
O(log n) - Log     - Binary search
O(n)   - Linear    - Linear search, array traversal
O(n log n) - Linearithmic - Merge sort, heap sort
O(n²)  - Quadratic - Bubble sort, nested loops
O(2ⁿ)  - Exponential - Recursive fibonacci`,
    description: 'Quick reference for time complexities',
    language: null,
    isFavorite: true,
    isPinned: false,
    itemTypeId: 'type_note',
    tags: ['algorithms', 'interview'],
    collectionIds: ['col_4', 'col_8'],
    createdAt: '2025-01-03T00:00:00Z',
    updatedAt: '2025-01-03T00:00:00Z',
  },
]

export const mockTypeCounts: Record<string, number> = {
  snippet: 24,
  prompt: 18,
  command: 15,
  note: 12,
  file: 5,
  image: 3,
  link: 8,
}
