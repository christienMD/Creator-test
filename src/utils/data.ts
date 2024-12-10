import { UserRole } from '../types/index-d';
import { Category, SubCategory, User, CartItem } from '../types/entities';
import { UploadFormValues } from '@/schemas/UploadSchema';

export const subCategories: SubCategory[] = [
  {
    id: 1,
    name: 'Smartphones',
    description: 'Latest mobile devices',
    category_id: 1,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: 2,
    name: 'Yoga',
    description: 'Yoga practices and routines',
    category_id: 2,
    created_at: new Date('2024-01-02'),
    updated_at: new Date('2024-01-02'),
  },
  {
    id: 3,
    name: 'Startups',
    description: 'Building and growing new businesses',
    category_id: 3,
    created_at: new Date('2024-01-03'),
    updated_at: new Date('2024-01-03'),
  },
  {
    id: 4,
    name: 'Modern Art',
    description: 'Contemporary artistic movements',
    category_id: 4,
    created_at: new Date('2024-01-04'),
    updated_at: new Date('2024-01-04'),
  },
  {
    id: 5,
    name: 'Online Courses',
    description: 'Digital learning platforms',
    category_id: 5,
    created_at: new Date('2024-01-05'),
    updated_at: new Date('2024-01-05'),
  },
  {
    id: 6,
    name: 'Budget Travel',
    description: 'Affordable travel tips',
    category_id: 6,
    created_at: new Date('2024-01-06'),
    updated_at: new Date('2024-01-06'),
  },
  {
    id: 7,
    name: 'Vegan Cooking',
    description: 'Plant-based recipes',
    category_id: 7,
    created_at: new Date('2024-01-07'),
    updated_at: new Date('2024-01-07'),
  },
  {
    id: 8,
    name: 'Cryptocurrency',
    description: 'Digital currency investing',
    category_id: 8,
    created_at: new Date('2024-01-08'),
    updated_at: new Date('2024-01-08'),
  },
  {
    id: 9,
    name: 'Soccer',
    description: 'Football news and analysis',
    category_id: 9,
    created_at: new Date('2024-01-09'),
    updated_at: new Date('2024-01-09'),
  },
  {
    id: 10,
    name: 'Astronomy',
    description: 'Space exploration and celestial events',
    category_id: 10,
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-10'),
  },
  {
    id: 11,
    name: 'Indoor Plants',
    description: 'Caring for houseplants',
    category_id: 11,
    created_at: new Date('2024-01-11'),
    updated_at: new Date('2024-01-11'),
  },
  {
    id: 12,
    name: 'Sustainable Fashion',
    description: 'Eco-friendly clothing options',
    category_id: 12,
    created_at: new Date('2024-01-12'),
    updated_at: new Date('2024-01-12'),
  },
];

export const categories: Category[] = [
  {
    id: 1,
    name: 'video',
    description: 'Video content including courses and tutorials',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: 2,
    name: 'audio',
    description: 'Audio content including podcasts and music',
    created_at: '2024-01-02',
    updated_at: '2024-01-02',
  },
  {
    id: 3,
    name: 'pdf',
    description: 'Digital books and publications',
    created_at: '2024-01-03',
    updated_at: '2024-01-03',
  },
  {
    id: 4,
    name: 'image',
    description: 'Digital art and photography collections',
    created_at: '2024-01-04',
    updated_at: '2024-01-04',
  },
  {
    id: 5,
    name: 'link',
    description: 'Curated resource collections and tools',
    created_at: '2024-01-05',
    updated_at: '2024-01-05',
  },
  {
    id: 6,
    name: 'zip',
    description: 'Downloadable resource packages',
    created_at: '2024-01-06',
    updated_at: '2024-01-06',
  },
];

export const users: User[] = [
  {
    id: 1,
    name: 'Nkwi Cyril',
    email: 'john.doe@example.com',
    password: 'hashedpassword1',
    role: UserRole.Creator,
    profile_pic:
      'https://ca.slack-edge.com/T05R6LXN7J8-U06R7GRBJSD-0bb90b6f36d1-512',
    bio: 'Passionate content creator specializing in tech tutorials.',
    created_at: new Date('2023-01-15'),
    updated_at: new Date('2023-01-15'),
  },
  {
    id: 2,
    name: 'Noela',
    email: 'jane.smith@example.com',
    password: 'hashedpassword2',
    role: UserRole.Creator,
    profile_pic:
      'https://ca.slack-edge.com/T05R6LXN7J8-U05UESZ9VFH-be11f0e2ee31-512',
    bio: 'UX designer creating educational content on user experience.',
    created_at: new Date('2023-02-20'),
    updated_at: new Date('2023-02-20'),
  },
  {
    id: 3,
    name: 'Njinda Salome',
    email: 'alex.johnson@example.com',
    password: 'hashedpassword3',
    role: UserRole.Creator,
    profile_pic:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07FGJV2HHC-541c5dc8f163-512',
    bio: 'Full-stack developer sharing coding tips and tricks.',
    created_at: new Date('2023-03-10'),
    updated_at: new Date('2023-03-10'),
  },
  {
    id: 4,
    name: 'Amah Lore',
    email: 'emily.brown@example.com',
    password: 'hashedpassword4',
    role: UserRole.Creator,
    profile_pic:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07FP57JYQK-cb8389e2012d-512',
    bio: 'Data scientist creating courses on AI and machine learning.',
    created_at: new Date('2023-04-05'),
    updated_at: new Date('2023-04-05'),
  },
  {
    id: 5,
    name: 'Boris Ashu',
    email: 'michael.lee@example.com',
    password: 'hashedpassword5',
    role: UserRole.Creator,
    profile_pic:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07G1TX3865-0c7b6ca91dcf-512',
    bio: 'DevOps engineer offering courses on cloud technologies.',
    created_at: new Date('2023-05-12'),
    updated_at: new Date('2023-05-12'),
  },
  {
    id: 6,
    name: 'Suzy Kenne',
    email: 'sarah.davis@example.com',
    password: 'hashedpassword6',
    role: UserRole.Creator,
    profile_pic:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07FRNSJ0PN-32469f3c0df8-512',
    bio: 'Product manager sharing insights on agile methodologies.',
    created_at: new Date('2023-06-18'),
    updated_at: new Date('2023-06-18'),
  },
  {
    id: 7,
    name: 'Fabiola Foletia',
    email: 'david.wilson@example.com',
    password: 'hashedpassword7',
    role: UserRole.Creator,
    profile_pic:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07JKP2EL21-f980933b44dd-512',
    bio: 'Cybersecurity expert offering online courses on digital safety.',
    created_at: new Date('2023-07-22'),
    updated_at: new Date('2023-07-22'),
  },
  {
    id: 8,
    name: 'Olivia Taylor',
    email: 'olivia.taylor@example.com',
    password: 'hashedpassword8',
    role: UserRole.Creator,
    profile_pic: 'https://source.unsplash.com/random/400x400?portrait,woman',
    bio: 'Frontend developer creating content on responsive web design.',
    created_at: new Date('2023-08-30'),
    updated_at: new Date('2023-08-30'),
  },
  {
    id: 9,
    name: 'Ethan Martinez',
    email: 'ethan.martinez@example.com',
    password: 'hashedpassword9',
    role: UserRole.Customer,
    profile_pic: 'https://source.unsplash.com/random/400x400?portrait,man',
    bio: 'Tech enthusiast always eager to learn new skills.',
    created_at: new Date('2023-09-14'),
    updated_at: new Date('2023-09-14'),
  },
  {
    id: 10,
    name: 'Sophia Anderson',
    email: 'sophia.anderson@example.com',
    password: 'hashedpassword10',
    role: UserRole.Customer,
    profile_pic:
      'https://source.unsplash.com/random/400x400?portrait,woman,professional',
    bio: 'Project manager looking to expand knowledge in various tech domains.',
    created_at: new Date('2023-10-05'),
    updated_at: new Date('2023-10-05'),
  },
  {
    id: 11,
    name: 'Liam Thompson',
    email: 'liam.thompson@example.com',
    password: 'hashedpassword11',
    role: UserRole.Customer,
    profile_pic: 'https://source.unsplash.com/random/400x400?portrait,man,tech',
    bio: 'Aspiring mobile app developer seeking to improve skills.',
    created_at: new Date('2023-11-19'),
    updated_at: new Date('2023-11-19'),
  },
  {
    id: 12,
    name: 'Ava Rodriguez',
    email: 'ava.rodriguez@example.com',
    password: 'hashedpassword12',
    role: UserRole.Customer,
    bio: 'QA professional interested in learning about the latest testing methodologies.',
    profile_pic:
      'https://source.unsplash.com/random/400x400?portrait,woman,technology',
    created_at: new Date('2023-12-01'),
    updated_at: new Date('2023-12-01'),
  },
];

export const sampleTestimonials = [
  {
    id: 1,
    name: 'Mesuel Christien',
    role: 'Content Creator',
    message:
      'This platform has been a game-changer for my digital content business. The ease of uploading and selling my work has allowed me to reach a global audience I never thought possible.',
    avatar:
      'https://ca.slack-edge.com/T05R6LXN7J8-U06QUPJK1H9-f06d77514c73-512',
  },
  {
    id: 2,
    name: 'Nkwi Cyril',
    role: 'Digital Artist',
    message:
      "As an artist, I was skeptical about selling my work online. But this platform's user-friendly interface and robust copyright protection have given me the confidence to share my creations with the world.",
    avatar:
      'https://ca.slack-edge.com/T05R6LXN7J8-U06R7GRBJSD-0bb90b6f36d1-512',
  },
  {
    id: 3,
    name: 'Suzy Kenne',
    role: 'Podcast Host',
    message:
      "I've been able to monetize my podcast content in ways I never imagined. The platform's analytics tools have helped me understand my audience better and create more targeted content.",
    avatar:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07FRNSJ0PN-32469f3c0df8-512',
  },
  {
    id: 4,
    name: 'Amah Laurel',
    role: 'E-book Author',
    message:
      "The seamless payment system and global reach of this platform have significantly boosted my e-book sales. It's opened up new markets for my writing that I couldn't access before.",
    avatar:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07FP57JYQK-cb8389e2012d-512',
  },
  {
    id: 5,
    name: 'Fabiola Foletia',
    role: 'Course Creator',
    message:
      'I love how easy it is to manage my online courses through this platform. The integrated tools for hosting video content and managing student interactions have streamlined my entire teaching process.',
    avatar:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07JKP2EL21-f980933b44dd-512',
  },
];

export const faqs = [
  {
    question: 'What is this platform about?',
    answer:
      'Our platform connects content creators with buyers, facilitating the sale and purchase of digital products.',
  },
  {
    question: 'How do I start selling my product?',
    answer:
      'To start selling, create an account, upload your product, set your prices, and start promoting your work to potential buyers.',
  },
  {
    question: 'Is my product protected?',
    answer:
      "Yes, we use industry-standard security measures to protect your product and ensure it's only accessible to authorized buyers.",
  },
  {
    question: 'How do I buy a product?',
    answer:
      'Browse through the catalog, select the product you like, add it to your cart, and proceed to secure checkout to complete your purchase.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'We accept a variety of payment methods, including MTN money, ORANGE money,to ensure a seamless transaction process.',
  },
];

export const creatorLinks = [
  {
    name: 'Mesueh Christien',
    imageSrc:
      'https://ca.slack-edge.com/T05R6LXN7J8-U06QUPJK1H9-f06d77514c73-512',
    href: '#',
  },
  {
    name: 'Njinda Salome',
    imageSrc:
      'https://media.licdn.com/dms/image/v2/D4E22AQF60obK-FRLwQ/feedshare-shrink_800/feedshare-shrink_800/0/1726583467952?e=1732147200&v=beta&t=t4atwpBdQ9192C5hTYjQYB8F2VGQf3Q5hC7SwOQffec',
    href: '#',
  },
  {
    name: 'Suzy Kenne',
    imageSrc:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07FRNSJ0PN-32469f3c0df8-512',
    href: '#',
  },
  {
    name: 'Ashu Boris',
    imageSrc:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07G1TX3865-0c7b6ca91dcf-512',
    href: '#',
  },
];

export const quotes = [
  {
    id: 1,
    name: 'Suzy Kenne',
    quote:
      'Develop success from failures. Discouragement and failure are two of the surest stepping stones to success.',
    avatar:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07FRNSJ0PN-32469f3c0df8-512',
    profession: 'Software Engineer',
    image:
      'https://images.unsplash.com/photo-1721807578532-dc1756624727?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8TThqVmJMYlRSd3N8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Mesueh Christein',
    quote:
      'Success is peace of mind, which is a direct result of self-satisfaction in knowing you made the effort to become the best of which you are capable.',
    avatar:
      'https://ca.slack-edge.com/T05R6LXN7J8-U06QUPJK1H9-f06d77514c73-512',
    profession: 'Full Stack Developer',
    image:
      'https://images.unsplash.com/photo-1728713080423-786a5a945b9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8M3x8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Nsem Confident',
    quote:
      "You can't stop things like Bitcoin. It will be everywhere, and the world will have to readjust. World governments will have to readjust.",
    avatar:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07FRNX756Y-3a1f8f6de3e5-512',
    profession: 'Software Engineer',
    image:
      'https://images.unsplash.com/photo-1696399316248-78f2b67768b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Nzd8fHxlbnwwfHx8fHw%3D',
  },
  {
    id: 4,
    name: 'Nkwi Cyril',
    quote:
      "Read 500 pages like this every day. That's how knowledge works. It builds up, like compound interest. All of you can do it, but I guarantee not many of you will do it.",
    avatar:
      'https://ca.slack-edge.com/T05R6LXN7J8-U06R7GRBJSD-0bb90b6f36d1-512',
    profession: 'Devops Engineer',
    image:
      'https://images.unsplash.com/photo-1535537501131-a93684fda998?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvbWVvZmZpY2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 5,
    name: 'Ashu Boris',
    quote:
      'The more I deal with the work as something that is my own, as something that is personal, the more successful it is.',
    avatar:
      'https://ca.slack-edge.com/T05R6LXN7J8-U07G1TX3865-0c7b6ca91dcf-512',
    profession: 'UI/UX Designer',
    image:
      'https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mdHdhcmVkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 6,
    name: 'Njinda Salome',
    quote:
      'The word ‘female,’ when inserted in front of something, is always with a note of surprise. Female COO, female pilot, female surgeon — as if the gender implies surprise … One day there won’t be female leaders. There will just be leaders.',
    avatar:
      'https://media.licdn.com/dms/image/v2/D4E22AQF60obK-FRLwQ/feedshare-shrink_800/feedshare-shrink_800/0/1726583467952?e=1732147200&v=beta&t=t4atwpBdQ9192C5hTYjQYB8F2VGQf3Q5hC7SwOQffec',
    profession: 'Full Stack Developer',
    image:
      'https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mdHdhcmVkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D',
  },
];

export const footerData = [
  {
    title: 'Features',
    links: [
      { label: 'Buy Product', href: '/catalog' },
      { label: 'Start Selling', href: '/creator/product/new' },
    ],
  },
  {
    title: 'Support & Ressources',
    links: [
      { label: 'FAQs', href: '' },
      { label: 'About', href: '/about' },
    ],
  },
];

export const navLinks = [
  { to: '/home', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/my-content', label: 'My Content' },
  { to: '/about', label: 'About' },
  { to: '/faqs', label: 'FAQs' },
];

export const CartItems: CartItem[] = [
  {
    id: 1,
    image:
      'https://cdn.dribbble.com/userupload/16418336/file/original-4c3fd5c6563b9572a50a8a7936b203ce.png?resize=1024x768',
    title: 'How to setup your react.js development environment',
    price: 5000,
    author: 'Christien MD',
    rating: 4.0,
  },
  {
    id: 2,
    image:
      'https://cdn.dribbble.com/userupload/12869921/file/original-52d446713cd97aab1bb75c7bb6145b54.jpg?resize=1024x768',
    title: '3D art of purple-yeti-cartoon-sitting-chair',
    price: 7500,
    author: 'Nkwi Cyril',
    rating: 4.5,
  },
  {
    id: 3,
    image:
      'https://cdn.dribbble.com/userupload/12869921/file/original-52d446713cd97aab1bb75c7bb6145b54.jpg?resize=1024x768',
    title: '3D art of purple-yeti-cartoon-sitting-chair',
    price: 7500,
    author: 'Nkwi Cyril',
    rating: 4.5,
  },
  {
    id: 4,
    image:
      'https://cdn.dribbble.com/userupload/12869921/file/original-52d446713cd97aab1bb75c7bb6145b54.jpg?resize=1024x768',
    title: '3D art of purple-yeti-cartoon-sitting-chair',
    price: 7500,
    author: 'Nkwi Cyril',
    rating: 4.5,
  },
];

export const breadcrumbsData = [
  { name: 'Category', href: '/category' },
  { name: 'Education', href: '/education' },
  { name: 'PDF', href: '/pdf' },
];
export const paymentMethods = [
  {
    name: 'Mobile Money',
    logo: 'https://s3-alpha-sig.figma.com/img/bcdc/e760/1e278b88f1bdd9ef62826e28f79c0869?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XRIoh3SE5CP-cA1U-QwCuzLP4aVQyQqZS64ZY56HpoDQjN8zh1W7xBlr2zmI0rtj1gy5bCVRc8FnBrIBHUdBoqxDXy9NMWTaJKuxnTeEmw3-B6PQrd5CjnIAC-1VcV8-uAOa3aupcOcxMzzXAWf-bJXvLXf6A-SrTo0DKVz~IFKclw5DzlP5tF~xlB0yn59e3NZyRO9iYJPxHeCB4QwZZvPDp6f29QA~Govpg1DLLzmikfwy1aRFuOzo2fSRjC~gr6G781n~UW6Mb2F7IeNhysptByuJMeuk1JtJgPJY92hWYGnvTRFtBwEZFRJWav9hgq9OWeorFJaNXk2IWaXrYA__',
  },
  {
    name: 'Orange Money',
    logo: 'https://s3-alpha-sig.figma.com/img/3720/692c/5b1088fdd41ffa51a2045fb028008277?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fvHsreNMUdXTvZLHKnO1GUuBmNJO9bUW07gmiDJ4ZKXn9Rh1k-ZXi4Q-GHhOQaXkSpewWFSVDkRT6igF8gTEsb0vR17exr3oO1Qqns1Tvncg2oo~Sx2hpSxAl-s6wlZLlvRiegg-S0XbpelXBzqJDJuXum~bf92wDOaLbudHgE3NW0fVd~HORrqgmTgeWrQmsVfsnX8cQ4sDiL2WFLIb534dgED8wRkLam~V4bWHPBXKQ0cOFdRiBx2Epw8dMIXqti91GVOdJejmIINvvC3WMLZmox8c8nBQ7i5cPEP4qh8jGsq1HVWqqIV9oHRsaddy4bCnJ8G-d6dN2Ri~Kko5JQ__',
  },
];

// Define the types first
type DashboardTitle = 'Buyers' | 'Revenue' | 'Content Bought';

interface DashboardItem {
  title: DashboardTitle;
  data: number[];
  labels: string[];
}

// Type the dashboard data
export const dashboardData: DashboardItem[] = [
  {
    title: 'Buyers',
    data: [750, 250, 300, 200, 500, 400, 200, 500, 350],
    labels: [
      '2023-01-01',
      '2023-02-01',
      '2023-03-01',
      '2023-04-01',
      '2023-05-01',
      '2023-06-01',
      '2023-07-01',
      '2023-08-01',
      '2023-10-01',
    ],
  },
  {
    title: 'Revenue',
    data: [100, 400, 200, 350, 450, 600, 500, 250, 300, 200],
    labels: [
      '2023-01-01',
      '2023-02-01',
      '2023-03-01',
      '2023-04-01',
      '2023-05-01',
      '2023-06-01',
      '2023-07-01',
      '2023-08-01',
      '2023-10-01',
    ],
  },
  {
    title: 'Content Bought',
    data: [50, 300, 200, 300, 400, 200, 250, 300, 200],
    labels: [
      '2023-01-01',
      '2023-02-01',
      '2023-03-01',
      '2023-04-01',
      '2023-05-01',
      '2023-06-01',
      '2023-07-01',
      '2023-08-01',
      '2023-10-01',
    ],
  },
];

// utils/data.ts
export const productFormField = [
  {
    name: 'category_id',
    label: 'Product Category',
  },
  // {
  //   name: "file",
  //   label: "Upload file",
  // },
  {
    name: 'title',
    label: 'Product Title',
  },
  {
    name: 'price',
    label: 'Product Price',
  },
  {
    name: 'description',
    label: 'Product Description',
  },
  {
    name: 'preview_video',
    label: 'Preview Video',
  },
  {
    name: 'banner',
    label: 'Banner Image',
  },
  {
    name: 'thumbnail',
    label: 'Thumbnail',
  },
];
export const productItemFormField = [
  {
    name: 'category_id',
    label: 'Product Category',
  },
  // {
  //   name: "file",
  //   label: "Upload file",
  // },
  {
    name: 'title',
    label: 'Product Title',
  },
  {
    name: 'order',
    label: 'Order',
  },
  {
    name: 'is_downloadable',
    label: 'Downloadable',
  },
  {
    name: 'description',
    label: 'Product Description',
  },
  {
    name: 'media',
    label: 'Media',
  },
];

// import { UploadFormValues } from "@/components/sections/UploadForm/UploadForm";

export const inputNames: (keyof UploadFormValues)[] = [
  'preview_video',
  'banner',
];
