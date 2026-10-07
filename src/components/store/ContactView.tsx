import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useStore();

  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentEmail, setAppointmentEmail] = useState('');
  const [appointmentPhone, setAppointmentPhone] = useState('');
  const [boutique, setBoutique] = useState('Paris Flagship — Rue du Faubourg Saint-Honoré');
  const [appointmentDate, setAppointmentDate] = useState('2026-10-18');
  const [appointmentTime, setAppointmentTime] = useState('14:30');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentName.trim() || !appointmentEmail.trim()) return;
    setIsBooked(true);
    showToast(`Appointment confirmed at ${boutique.split('—')[0]}`, 'gold');
  };

  const boutiques = [
    {
      city: 'Paris',
      name: 'Rue du Faubourg Saint-Honoré',
      address: '42 Rue du Faubourg Saint-Honoré, 75008 Paris',
      hours: 'Monday – Saturday: 10:30 – 19:30',
      phone: '+33 1 42 68 55 00',
      concierge: 'Béatrice de Valois'
    },
    {
      city: 'Milano',
      name: 'Via Montenapoleone',
      address: 'Via Montenapoleone 18, 20121 Milano',
      hours: 'Monday – Saturday: 10:00 – 19:30',
      phone: '+39 02 7600 8920',
      concierge: 'Gianluca Rossi'
    },
    {
      city: 'New York',
      name: 'Madison Avenue',
      address: '785 Madison Avenue, New York, NY 10065',
      hours: 'Monday – Saturday: 10:00 – 18:30 · Sunday: 12:00 – 17:00',
      phone: '+1 212 555 0192',
      concierge: 'Evelyn Montgomery'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="border-b border-[#E8E4DA] pb-8 text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.24em] text-[#9F7A3E] font-medium block">
          Client Services & Salons Privés
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#141413]">
          Connect with the Maison Concierge
        </h1>
        <p className="text-xs sm:text-sm text-[#706A5F] font-light leading-relaxed">
          Whether you desire a private salon viewing, bespoke hide selection, or assistance with an existing heirloom, our personal client liaisons await your correspondence.
        </p>
      </div>

      {/* Grid: Booking Form + Boutique Addresses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Private Appointment Form */}
        <div className="lg:col-span-7 bg-white border border-[#E8E4DA] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#F0ECE1] pb-3">
            <span className="text-[10px] uppercase tracking-wider text-[#9F7A3E] font-semibold block">
              Salons Privés
            </span>
            <h2 className="font-serif text-2xl text-[#141413] mt-0.5">
              Reserve an In-Store Consultation
            </h2>
          </div>

          {isBooked ? (
            <div className="p-8 bg-[#FAF9F6] border border-[#C5A880] text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-[#9F7A3E] mx-auto" />
              <h3 className="font-serif text-xl text-[#141413]">Appointment Registered</h3>
              <p className="text-xs text-[#524E46] max-w-md mx-auto leading-relaxed">
                Thank you, {appointmentName}. Your private consultation has been reserved for {appointmentDate} at {appointmentTime}. A confirmation dossier and salon access card have been dispatched to {appointmentEmail}.
              </p>
              <button
                onClick={() => setIsBooked(false)}
                className="px-6 py-2 border border-[#141413] text-xs uppercase tracking-wider hover:bg-[#141413] hover:text-white transition-colors"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    value={appointmentName}
                    onChange={(e) => setAppointmentName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={appointmentEmail}
                    onChange={(e) => setAppointmentEmail(e.target.value)}
                    placeholder="e.g. e.vance@geneva.ch"
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Telephone Contact *</label>
                  <input
                    type="tel"
                    required
                    value={appointmentPhone}
                    onChange={(e) => setAppointmentPhone(e.target.value)}
                    placeholder="+44 20 7946 0912"
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Select Flagship Salon *</label>
                  <select
                    value={boutique}
                    onChange={(e) => setBoutique(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                  >
                    <option value="Paris Flagship — Rue du Faubourg Saint-Honoré">Paris — Rue du Faubourg Saint-Honoré</option>
                    <option value="Milano Flagship — Via Montenapoleone">Milano — Via Montenapoleone</option>
                    <option value="New York Flagship — Madison Avenue">New York — Madison Avenue</option>
                    <option value="Virtual Salon — Private Digital Consultation">Virtual Salon — Digital Video Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Preferred Time *</label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                  >
                    <option value="11:00">11:00 Morning Salon</option>
                    <option value="14:30">14:30 Afternoon Salon</option>
                    <option value="16:00">16:00 Tea Consultation</option>
                    <option value="18:00">18:00 Evening Aperitivo Salon</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Specific Silhouettes or Requests of Interest</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Inform our stylist of specific handbags, leather swatches, or initials you wish to examine..."
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#141413] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#38342D] transition-colors"
              >
                Confirm Private Appointment
              </button>
            </form>
          )}
        </div>

        {/* Right: Flagship Boutiques */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif text-2xl text-[#141413]">
            Our Flagship Salons
          </h2>

          <div className="space-y-4">
            {boutiques.map((b) => (
              <div key={b.city} className="bg-white border border-[#E8E4DA] p-6 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-2">
                  <h3 className="font-serif text-lg text-[#141413] font-semibold">
                    {b.city} Flagship
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#9F7A3E] font-medium">
                    {b.name}
                  </span>
                </div>

                <div className="space-y-2 text-[#524E46]">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>{b.hours}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>{b.phone}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F0ECE1] flex justify-between items-center text-[11px] text-[#706A5F]">
                  <span>Lead Concierge: <strong>{b.concierge}</strong></span>
                  <span className="text-[#9F7A3E]">Private Salon Available</span>
                </div>
              </div>
            ))}
          </div>

          {/* Direct channels */}
          <div className="p-6 bg-[#FAF9F6] border border-[#E8E4DA] space-y-2 text-xs text-[#524E46]">
            <span className="text-[10px] uppercase tracking-wider text-[#9F7A3E] font-semibold block">
              Immediate Concierge Assistance
            </span>
            <p>Email: <a href="mailto:concierge@luxehaven.com" className="font-mono text-[#141413] underline">concierge@luxehaven.com</a></p>
            <p>Direct WhatsApp Privé: <span className="font-mono text-[#141413]">+33 7 92 84 10 20</span></p>
          </div>
        </div>

      </div>

    </div>
  );
};
