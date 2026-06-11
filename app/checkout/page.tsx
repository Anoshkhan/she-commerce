'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MapPin, CreditCard, CheckCircle, AlertCircle, Loader, Truck, Lock, Smartphone, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const { auth } = useAuth()
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [walletSimStep, setWalletSimStep] = useState<'idle' | 'sending' | 'prompt_shown' | 'success'>('idle')

  const [formData, setFormData] = useState({
    fullName: auth.user?.fullName || '',
    email: auth.user?.email || '',
    phone: auth.user?.phone || '',
    street: '',
    city: '',
    province: '',
    zipCode: '',
    paymentMethod: 'cod',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    walletNumber: auth.user?.phone || '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const computedTotalBill = useMemo(() => {
    if (!cart?.items) return 0
    return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }, [cart?.items])

  if (!cart?.items || (cart.items.length === 0 && step !== 'confirmation')) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-16 text-center overflow-hidden">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Add items to your cart before checking out</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition"
        >
          <ShoppingBag className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    )
  }

  const validateShipping = () => {
    const newErrors: Record<string, string> = {}
    if (!auth.isAuthenticated) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^(03|\+923)\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Enter a valid phone number (e.g., 03001234567)'
    }
    if (!formData.street.trim()) newErrors.street = 'Street address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.province) newErrors.province = 'Province is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePayment = () => {
    const newErrors: Record<string, string> = {}
    if (formData.paymentMethod === 'card') {
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required'
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required'
      } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Must be a valid 16-digit card number'
      }
      if (!formData.cardExpiry.trim()) {
        newErrors.cardExpiry = 'Expiry date is required'
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Use MM/YY format'
      }
      if (!formData.cardCvv.trim()) {
        newErrors.cardCvv = 'CVV code required'
      } else if (formData.cardCvv.length < 3) {
        newErrors.cardCvv = 'Invalid CVV'
      }
    }
    if (['easypaisa', 'jazzcash'].includes(formData.paymentMethod)) {
      if (!formData.walletNumber.trim()) {
        newErrors.walletNumber = 'Wallet account number is required'
      } else if (!/^(03|\+923)\d{9}$/.test(formData.walletNumber.replace(/[\s-]/g, ''))) {
        newErrors.walletNumber = 'Enter a valid mobile account number'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleShippingNext = () => {
    if (validateShipping()) {
      if (!formData.walletNumber) {
        setFormData(prev => ({ ...prev, walletNumber: formData.phone }))
      }
      setStep('payment')
    }
  }

  const handlePlaceOrder = async () => {
    if (!validatePayment()) return
    setIsProcessing(true)

    if (['easypaisa', 'jazzcash'].includes(formData.paymentMethod)) {
      setWalletSimStep('sending')
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setWalletSimStep('prompt_shown')
      return
    }
    executeOrderFinalization()
  }

  const executeOrderFinalization = async () => {
    setIsProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const orderNum = `SHE-${Date.now()}`
      setOrderNumber(orderNum)
      clearCart()
      setStep('confirmation')
      setWalletSimStep('idle')
    } catch (error) {
      setErrors({ payment: 'Order processing failed.' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:py-8 overflow-x-hidden box-border">
      
      {/* FIXED: Removed min-w-md constraint to prevent horizontal page scrolling */}
      <div className="flex justify-between items-center mb-6 w-full max-w-full bg-muted/40 p-2 rounded-xl border border-border/60 box-border">
        {['shipping', 'payment', 'confirmation'].map((s, idx) => (
          <div key={s} className="flex items-center gap-1 justify-center flex-1 min-w-0">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                step === s
                  ? 'bg-primary text-primary-foreground'
                  : ['shipping', 'payment'].includes(step) && ['shipping', 'payment'].indexOf(s) < ['shipping', 'payment'].indexOf(step)
                  ? 'bg-green-600 text-white'
                  : 'bg-muted-foreground/20 text-muted-foreground'
              }`}
            >
              {['shipping', 'payment'].includes(step) && ['shipping', 'payment'].indexOf(s) < ['shipping', 'payment'].indexOf(step) ? (
                <CheckCircle className="w-3.5 h-3.5" />
              ) : (
                idx + 1
              )}
            </div>
            <span className={`text-[11px] font-semibold capitalize ${step === s ? 'text-foreground' : 'text-muted-foreground'} hidden sm:inline truncate`}>
              {s}
            </span>
            {idx < 2 && <span className="text-muted-foreground/30 text-[10px] mx-1 shrink-0">→</span>}
          </div>
        ))}
      </div>

      {/* Grid wrapper container with structural viewport shields */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 w-full max-w-full overflow-hidden box-border">
        
        {/* Step panel columns */}
        <div className="w-full min-w-0 order-1 lg:col-span-2">
          {step === 'shipping' && (
            <div className="bg-white rounded-lg border border-border p-4 shadow-sm w-full box-border">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Shipping Destination Details
              </h2>
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      disabled={auth.isAuthenticated}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white border-border focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={auth.isAuthenticated}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white border-border focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="03001234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white border-border focus:ring-1 focus:ring-primary"
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Street Address</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white border-border focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white border-border focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Province</label>
                    <select
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white border-border focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select</option>
                      <option value="Sindh">Sindh</option>
                      <option value="Punjab">Punjab</option>
                      <option value="KPK">KPK</option>
                      <option value="Balochistan">Balochistan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Zip Code</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white border-border focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  onClick={handleShippingNext}
                  className="w-full py-2.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium rounded-lg text-sm mt-2 flex items-center justify-center gap-1.5 hover:opacity-90 transition"
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="bg-white rounded-lg border border-border p-4 shadow-sm w-full box-border">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                Select Payment Method
              </h2>

              <div className="space-y-3 mb-4 w-full">
                {/* COD Option */}
                <label className={`flex items-start p-3 border rounded-lg cursor-pointer transition ${formData.paymentMethod === 'cod' ? 'border-primary bg-muted/40 ring-1 ring-primary' : 'border-border'} w-full box-border`}>
                  <input
                    type="radio"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => { setFormData({ ...formData, paymentMethod: 'cod' }); setWalletSimStep('idle'); }}
                    className="mt-1 text-primary shrink-0"
                  />
                  <div className="ml-3 flex gap-2 min-w-0 flex-1">
                    <Truck className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <span className="block font-bold text-xs sm:text-sm text-foreground">Cash on Delivery (COD)</span>
                      <span className="block text-[11px] text-muted-foreground mt-0.5 break-words">Pay with cash when package arrives.</span>
                    </div>
                  </div>
                </label>

                {/* EasyPaisa Wallet Option */}
                <label className={`flex items-start p-3 border rounded-lg cursor-pointer transition ${formData.paymentMethod === 'easypaisa' ? 'border-primary bg-muted/40 ring-1 ring-primary' : 'border-border'} w-full box-border`}>
                  <input
                    type="radio"
                    checked={formData.paymentMethod === 'easypaisa'}
                    onChange={() => { setFormData({ ...formData, paymentMethod: 'easypaisa' }); setWalletSimStep('idle'); }}
                    className="mt-1 text-primary shrink-0"
                  />
                  <div className="ml-3 flex items-center justify-between w-full gap-2 min-w-0 flex-1">
                    <div className="min-w-0 flex-1">
                      <span className="block font-bold text-xs sm:text-sm text-foreground">EasyPaisa Wallet</span>
                      <span className="block text-[11px] text-muted-foreground mt-0.5 break-words">Pay securely via mobile wallet app request.</span>
                    </div>
                    <img src="/easypaisa-logo.png" alt="EasyPaisa" className="h-6 w-auto object-contain shrink-0 max-w-[60px]" />
                  </div>
                </label>

                {/* JazzCash Wallet Option */}
                <label className={`flex items-start p-3 border rounded-lg cursor-pointer transition ${formData.paymentMethod === 'jazzcash' ? 'border-primary bg-muted/40 ring-1 ring-primary' : 'border-border'} w-full box-border`}>
                  <input
                    type="radio"
                    checked={formData.paymentMethod === 'jazzcash'}
                    onChange={() => { setFormData({ ...formData, paymentMethod: 'jazzcash' }); setWalletSimStep('idle'); }}
                    className="mt-1 text-primary shrink-0"
                  />
                  <div className="ml-3 flex items-center justify-between w-full gap-2 min-w-0 flex-1">
                    <div className="min-w-0 flex-1">
                      <span className="block font-bold text-xs sm:text-sm text-foreground">JazzCash Wallet</span>
                      <span className="block text-[11px] text-muted-foreground mt-0.5 break-words">Pay securely using your JazzCash wallet credentials.</span>
                    </div>
                    <img src="/jazzcash-logo.png" alt="JazzCash" className="h-6 w-auto object-contain shrink-0 max-w-[60px]" />
                  </div>
                </label>

                {/* Debit Card option */}
                <label className={`flex items-start p-3 border rounded-lg cursor-pointer transition ${formData.paymentMethod === 'card' ? 'border-primary bg-muted/40 ring-1 ring-primary' : 'border-border'} w-full box-border`}>
                  <input
                    type="radio"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => { setFormData({ ...formData, paymentMethod: 'card' }); setWalletSimStep('idle'); }}
                    className="mt-1 text-primary shrink-0"
                  />
                  <div className="ml-3 flex gap-2 w-full justify-between items-center min-w-0 flex-1">
                    <div className="min-w-0 flex-1">
                      <span className="block font-bold text-xs sm:text-sm text-foreground">Credit / Debit Card</span>
                      <span className="block text-[11px] text-muted-foreground mt-0.5 break-words">Visa, MasterCard, PayPak supported.</span>
                    </div>
                    <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                  </div>
                </label>

                {/* Number verification node for mobile apps */}
                {['easypaisa', 'jazzcash'].includes(formData.paymentMethod) && walletSimStep === 'idle' && (
                  <div className="mt-2 p-3 bg-muted/30 rounded-lg border border-border w-full box-border">
                    <label className="block text-xs font-medium text-foreground mb-1 capitalize">
                      Your {formData.paymentMethod} Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="03xxxxxxxxx"
                      value={formData.walletNumber}
                      onChange={(e) => setFormData({ ...formData, walletNumber: e.target.value })}
                      className="w-full px-3 py-1.5 border rounded-md text-xs bg-white text-foreground border-border focus:outline-none box-border"
                    />
                  </div>
                )}

                {/* Mock gateway status view frame overlay */}
                {['easypaisa', 'jazzcash'].includes(formData.paymentMethod) && walletSimStep !== 'idle' && (
                  <div className="mt-2 p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3 text-center w-full box-border overflow-hidden">
                    {walletSimStep === 'sending' && (
                      <div className="py-2 space-y-1">
                        <Loader className="w-4 h-4 animate-spin text-green-400 mx-auto" />
                        <h4 className="text-xs">Processing Wallet Link...</h4>
                      </div>
                    )}

                    {walletSimStep === 'prompt_shown' && (
                      <div className="max-w-full mx-auto space-y-2 min-w-0 w-full">
                        <div className="border border-slate-700 bg-slate-950 rounded-xl p-2.5 text-left w-full box-border overflow-hidden">
                          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-center space-y-1">
                            <Smartphone className="w-4 h-4 text-green-400 mx-auto" />
                            <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-200 truncate">
                              {formData.paymentMethod} Push Simulation
                            </h5>
                            <p className="text-[11px] text-slate-300 break-words">
                              Approve transaction of <span className="text-green-400 font-bold">₨{computedTotalBill.toLocaleString()}</span> to SheCommerce?
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={executeOrderFinalization}
                          className="w-full py-2 bg-green-600 text-white font-bold text-xs rounded-md shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Simulate PIN Entry Approval
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {walletSimStep === 'idle' && (
                <div className="flex gap-3 w-full box-border">
                  <button
                    onClick={() => setStep('shipping')}
                    className="flex-1 py-2.5 border border-border rounded-lg text-foreground font-medium text-xs hover:bg-muted transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium rounded-lg text-xs hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    {isProcessing ? <Loader className="w-3.5 h-3.5 animate-spin" /> : (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        Confirm Order
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 'confirmation' && (
            <div className="bg-white rounded-lg border border-border p-5 text-center shadow-sm w-full box-border overflow-hidden">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-base font-bold text-foreground mb-1">Order Confirmed!</h2>
              <div className="bg-muted p-2 rounded-lg max-w-xs mx-auto mb-4 w-full box-border">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Order Reference</p>
                <p className="text-xs font-mono font-bold text-foreground mt-0.5 break-all">{orderNumber}</p>
              </div>
              <Link href="/" className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium">
                <ShoppingBag className="w-3.5 h-3.5" />
                Return to Shop
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary list component */}
        <div className="w-full min-w-0 order-2 lg:col-span-1">
          <div className="bg-white rounded-lg border border-border p-4 shadow-sm w-full box-border overflow-hidden">
            <h3 className="font-bold text-sm sm:text-base text-foreground mb-3">Order Summary</h3>
            
            <div className="space-y-2 mb-3 max-h-36 overflow-y-auto pr-1 w-full box-border">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-xs text-muted-foreground gap-2 w-full min-w-0">
                  <span className="truncate flex-1 min-w-0 break-words">{item.product.name} <span className="text-foreground/60">x{item.quantity}</span></span>
                  <span className="font-medium text-foreground shrink-0 ml-1">₨{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3 space-y-2 text-xs w-full box-border">
              <div className="flex justify-between text-muted-foreground w-full">
                <span>Subtotal</span>
                <span className="text-foreground font-medium">₨{computedTotalBill.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground w-full">
                <span>Shipping Fee</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground w-full">
                <span>Sales Tax</span>
                <span className="text-foreground font-medium">₨0</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-foreground pt-2.5 border-t border-dashed mt-2 w-full">
                <span>Total Bill Amount</span>
                <span className="text-primary text-base">₨{computedTotalBill.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}