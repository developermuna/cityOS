import React, { useState } from 'react';
import { X, CreditCard, Banknote, QrCode, Check, ShieldCheck } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { generateUpiPaymentString } from '../services/paymentService';

export const PaymentModal = ({
  isOpen,
  onClose,
  selectedPayment = 'Pay Now',
  onSelectPayment,
  amount = 35,
  showToast,
}) => {
  const [showQr, setShowQr] = useState(false);
  const upiUrl = generateUpiPaymentString({ amount });

  if (!isOpen) return null;

  const paymentOptions = [
    { id: 'Pay Now', label: 'Online / UPI (Pay Now)', icon: QrCode, badge: 'Recommended' },
    { id: 'Cash', label: 'Cash on Arrival', icon: Banknote, badge: 'Pay Captain' },
    { id: 'Card', label: 'Credit / Debit Card', icon: CreditCard, badge: 'Visa / MC / RuPay' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-gray-900 text-base">Select Payment Method</h3>
            <p className="text-xs text-gray-500">Trip Fare: <span className="font-bold text-gray-900">₹{amount}</span></p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col gap-2">
          {paymentOptions.map((opt) => {
            const isSelected = selectedPayment === opt.id;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onSelectPayment && onSelectPayment(opt.id);
                  if (opt.id === 'Pay Now') setShowQr(true);
                  else setShowQr(false);
                }}
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'border-black bg-gray-50 ring-1 ring-black/5'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-2 rounded-xl ${isSelected ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="font-bold text-xs text-gray-900 block">{opt.label}</span>
                    <span className="text-[11px] text-gray-400">{opt.badge}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Dynamic UPI QR Display */}
        {(showQr || selectedPayment === 'Pay Now') && (
          <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-gray-700">Scan & Pay via any UPI App</span>
            <div className="p-2.5 bg-white rounded-xl shadow-xs border border-gray-200">
              <QRCodeCanvas value={upiUrl} size={130} />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>GPay • PhonePe • Paytm • BHIM</span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (showToast) showToast(`Payment method updated to ${selectedPayment}`);
            onClose();
          }}
          className="w-full py-3 rounded-xl font-bold text-xs bg-black hover:bg-gray-900 text-white transition-colors"
        >
          Confirm Payment Selection
        </button>
      </div>
    </div>
  );
};
