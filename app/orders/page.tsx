'use client'

import Link from 'next/link'
import { Package, Check, Truck, MapPin } from 'lucide-react'
import { mockOrders } from '@/lib/mock-data'
import { useAuth } from '@/lib/auth-context'

export default function OrdersPage() {
  const { auth } = useAuth()

  if (!auth.isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Sign In to View Orders</h1>
        <p className="text-muted-foreground mb-6">You must be logged in to view your orders</p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90"
        >
          Go to Sign In
        </Link>
      </div>
    )
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  const statusIcons = {
    pending: <Package className="w-5 h-5" />,
    confirmed: <Check className="w-5 h-5" />,
    shipped: <Truck className="w-5 h-5" />,
    delivered: <Check className="w-5 h-5" />,
    cancelled: <Package className="w-5 h-5" />,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>

      {mockOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">No Orders Yet</h2>
          <p className="text-muted-foreground mb-6">You haven&apos;t placed any orders yet</p>
          <Link
            href="/categories"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <div className="bg-white border border-border rounded-lg p-6 hover:border-primary hover:shadow-md transition">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Order Info */}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-medium">Order Number</p>
                    <p className="font-bold text-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Items */}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-medium">Items</p>
                    <p className="font-bold text-foreground">{order.items.length} item(s)</p>
                    <div className="text-xs text-muted-foreground mt-1 space-y-1">
                      {order.items.slice(0, 2).map((item) => (
                        <p key={item.id} className="truncate">{item.productName}</p>
                      ))}
                      {order.items.length > 2 && (
                        <p>+{order.items.length - 2} more</p>
                      )}
                    </div>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-medium">Total</p>
                    <p className="font-bold text-foreground text-lg">₨{order.totalAmount.toLocaleString()}</p>
                  </div>

                  {/* Status */}
                  <div className="flex items-end">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${statusColors[order.status]}`}>
                      {statusIcons[order.status]}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                {order.status === 'shipped' && order.estimatedDelivery && (
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4" />
                    <span>Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
