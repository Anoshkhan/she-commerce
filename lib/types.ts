export interface User {
  id: string
  email: string
  fullName: string
  phone: string
  avatar?: string
  address?: {
    street: string
    city: string
    province: string
    zipCode: string
    country: string
  }
  wishlist: string[]
  createdAt: Date
  isVerified: boolean
}

export interface Seller {
  id: string
  userId: string
  storeName: string
  description: string
  logo: string
  bannerImage: string
  rating: number
  totalReviews: number
  totalSales: number
  isVerified: boolean
  province: string
  specialties: string[]
  responseTime: string
  joinDate: Date
}

export interface Product {
  id: string
  sellerId: string
  sellerName: string
  name: string
  description: string
  category: string
  images: string[]
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  totalReviews: number
  inStock: boolean
  stockCount: number
  tags: string[]
  createdAt: Date
  handmade: boolean
  certificateOfAuthenticity?: string
}

export interface CartItem {
  id: string
  productId: string
  sellerId: string
  sellerName: string
  quantity: number
  price: number
  product: Product
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    street: string
    city: string
    province: string
    zipCode: string
    country: string
  }
  paymentMethod: string
  createdAt: Date
  updatedAt: Date
  estimatedDelivery?: Date
  trackingNumber?: string
}

export interface OrderItem {
  id: string
  productId: string
  sellerId: string
  sellerName: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  createdAt: Date
  helpful: number
}

export interface Notification {
  id: string
  userId: string
  type: 'order' | 'product' | 'seller' | 'promotion'
  title: string
  message: string
  link?: string
  read: boolean
  createdAt: Date
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  error?: string
}

export interface WishlistState {
  items: string[]
}
