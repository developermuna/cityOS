import React, { useState } from 'react';
import { X, AlertTriangle, Upload, CheckCircle2 } from 'lucide-react';
import { rentalMarketplaceService } from '../../services/rentalMarketplaceService';

export const RentalIssueReportModal = ({ booking, onClose, showToast }) => {
  const [issueType, setIssueType] = useState('Mechanical Breakdown / Non-working');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      if (showToast) showToast('Please describe the issue in detail');
      return;
    }

    rentalMarketplaceService.reportIssue(booking.id, {
      issueType,
      description
    });

    setSubmitted(true);
    if (showToast) showToast('Issue reported to cityOS Dispute & Support team');
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">Report Issue / Damage</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-2" />
            <h4 className="text-base font-bold text-slate-900">Ticket Created</h4>
            <p className="text-xs text-slate-500 mt-1">Our mediation team will contact you and the owner within 30 minutes.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Issue Category
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white font-semibold focus:outline-none focus:border-[#FF5200]"
              >
                <option>Mechanical Breakdown / Non-working</option>
                <option>Pre-existing Scratch or Dent Found</option>
                <option>Item Dirty or Sanitization Issue</option>
                <option>Missing Accessories / Parts</option>
                <option>Host Unresponsive</option>
                <option>Accidental Damage Incident</option>
                <option>Other Operational Issue</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Description of the Issue
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Explain what happened, condition changes, or assistance needed..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5200] resize-none"
              />
            </div>

            <div className="flex items-center gap-2 p-3 border border-dashed border-slate-200 rounded-xl text-xs text-slate-500 cursor-pointer hover:bg-slate-50">
              <Upload className="w-4 h-4 text-[#FF5200]" />
              <span>Attach Photos / Videos of Damage (Recommended)</span>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3.5 rounded-2xl shadow-sm transition-all active:scale-95"
            >
              Submit Ticket to Support
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
