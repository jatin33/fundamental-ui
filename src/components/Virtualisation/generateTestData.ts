export interface ListItem {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  department: string;
  salary: number;
}

const departments = [
  'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 
  'Operations', 'Design', 'Product', 'Legal', 'Support'
];

const firstNames = [
  'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Chris', 'Lisa',
  'Robert', 'Ashley', 'James', 'Jessica', 'William', 'Amanda', 'Daniel',
  'Stephanie', 'Matthew', 'Jennifer', 'Joseph', 'Nicole', 'Anthony', 'Rachel'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
];

const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];

// Generate avatar URL using a placeholder service
const generateAvatar = (seed: number): string => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};

// Generate random date within last 5 years
const generateJoinDate = (seed: number): string => {
  const now = new Date();
  const fiveYearsAgo = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());
  const randomTime = fiveYearsAgo.getTime() + (seed % (now.getTime() - fiveYearsAgo.getTime()));
  return new Date(randomTime).toISOString().split('T')[0];
};

// Seeded random number generator for consistent results
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(max: number): number {
    return Math.floor(this.next() * max);
  }
}

export const generateTestData = (count: number = 100000): ListItem[] => {
  const items: ListItem[] = [];
  
  console.time('Data Generation');
  
  for (let i = 0; i < count; i++) {
    const rng = new SeededRandom(i + 1);
    
    const firstName = firstNames[rng.nextInt(firstNames.length)];
    const lastName = lastNames[rng.nextInt(lastNames.length)];
    const department = departments[rng.nextInt(departments.length)];
    const status = statuses[rng.nextInt(statuses.length)];
    
    items.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      avatar: generateAvatar(i + 1),
      status,
      joinDate: generateJoinDate(i + 1),
      department,
      salary: 40000 + rng.nextInt(120000) // $40k - $160k range
    });
  }
  
  console.timeEnd('Data Generation');
  console.log(`Generated ${count} items`);
  
  return items;
};

// Performance testing utilities
export const measureRenderTime = (fn: () => void, label: string): void => {
  console.time(label);
  fn();
  console.timeEnd(label);
};

// Memory usage helper
export const getMemoryUsage = (): string => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return `Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB, Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`;
  }
  return 'Memory info not available';
};
