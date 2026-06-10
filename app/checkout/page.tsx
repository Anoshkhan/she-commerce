'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MapPin, CreditCard, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/app/context/language-context'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const { auth } = useAuth()
  const { t } = useLanguage()
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const [formData, setFormData] = useState({
    fullName: auth.user?.fullName || '',
    email: auth.user?.email || '',
    phone: auth.user?.phone || '',
    street: '',
    city: '',
    province: '',
    zipCode: '',
    paymentMethod: 'cash_on_delivery',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!auth.isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Please Sign In</h1>
        <p className="text-muted-foreground mb-6">You must be logged in to proceed with checkout</p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90"
        >
          Go to Sign In
        </Link>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Add items to your cart before checking out</p>
        <Link
          href="/categories"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  const validateShipping = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.street) newErrors.street = 'Street address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.province) newErrors.province = 'Province is required'
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleShippingNext = () => {
    if (validateShipping()) {
      setStep('payment')
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const orderNum = `SHE-${Date.now()}`
      setOrderNumber(orderNum)
      clearCart()
      setStep('confirmation')
    } catch (error) {
      setErrors({ payment: 'Payment failed. Please try again.' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="flex gap-4 mb-12">
        {['shipping', 'payment', 'confirmation'].map((s, idx) => (
          <div key={s} className="flex items-center gap-4 flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step === s
                  ? 'bg-primary text-primary-foreground'
                  : ['shipping', 'payment'].includes(step) && ['shipping', 'payment'].indexOf(s) < ['shipping', 'payment'].indexOf(step)
                  ? 'bg-green-600 text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {['shipping', 'payment'].includes(step) && ['shipping', 'payment'].indexOf(s) < ['shipping', 'payment'].indexOf(step) ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                idx + 1
              )}
            </div>
            <span className="font-medium text-foreground hidden sm:block">
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </span>
            {idx < 2 && <div className="flex-1 h-0.5 bg-muted"></div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 'shipping' && (
            <div className="bg-white rounded-lg border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                Shipping Address
              </h2>

              <div className="space-y-4">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      disabled
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    disabled
                    className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Street Address</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder="123 Main St"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground ${
                      errors.street ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.street && <p className="text-destructive text-sm mt-1">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Karachi"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground ${
                        errors.city ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Province</label>
                    <select
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground ${
                        errors.province ? 'border-destructive' : 'border-border'
                      }`}
                    >
                      <option value="">Select Province</option>
                      <option value="Sindh">Sindh</option>
                      <option value="Punjab">Punjab</option>
                      <option value="KPK">KPK</option>
                      <option value="Balochistan">Balochistan</option>
                    </select>
                    {errors.province && <p className="text-destructive text-sm mt-1">{errors.province}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Zip Code</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="75000"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground ${
                        errors.zipCode ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.zipCode && <p className="text-destructive text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                </div>

                <button
                  onClick={handleShippingNext}
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition mt-6"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="bg-white rounded-lg border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-primary" />
                {t('selectPaymentMethod')}
              </h2>

              <div className="space-y-3 mb-8">
                {[
                  { value: 'cash_on_delivery', label: 'cashOnDelivery', icon: '💵' },
                  { value: 'easypaisa', label: 'easypaisa', icon: '📱' },
                  { value: 'bank_transfer', label: 'bankTransfer', icon: '🏦' },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      formData.paymentMethod === method.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={formData.paymentMethod === method.value}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      value={method.value}
                      className="w-5 h-5 accent-primary"
                    />
                    <span className="ml-3 text-2xl">{method.icon}</span>
                    <span className="ml-3 font-medium text-foreground">{t(method.label)}</span>
                  </label>
                ))}
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-sm mb-6">
                <p className="font-medium mb-2">Payment Information:</p>
                <p>
                  {formData.paymentMethod === 'cash_on_delivery' &&
                    'Pay with cash when your order is delivered.'}
                  {formData.paymentMethod === 'easypaisa' &&
                    'Pay securely using Easypaisa mobile wallet.'}
                  {formData.paymentMethod === 'bank_transfer' &&
                    'Transfer funds directly to our bank account.'}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('shipping')}
                  className="flex-1 py-3 border border-border rounded-lg text-foreground font-medium hover:bg-muted transition"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="bg-white rounded-lg border border-border p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h2>
              <p className="text-muted-foreground mb-6">Thank you for your purchase</p>
              <div className="bg-muted p-4 rounded-lg mb-8">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="text-2xl font-bold text-foreground">{orderNumber}</p>
              </div>
              <p className="text-muted-foreground mb-8">
                You&apos;ll receive an email confirmation shortly. Track your order in the &quot;My Orders&quot; section.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/orders"
                  className="flex-1 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition text-center"
                >
                  View Orders
                </Link>
                <Link
                  href="/"
                  className="flex-1 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
            <h3 className="font-bold text-foreground mb-6">Order Summary</h3>

            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    {item.product.name.substring(0, 20)}... x{item.quantity}
                  </span>
                  <span>₨{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₨{cart.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>₨0</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground">
                <span>Total</span>
                <span className="text-lg text-primary">₨{cart.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
