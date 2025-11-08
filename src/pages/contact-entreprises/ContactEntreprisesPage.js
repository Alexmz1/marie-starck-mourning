// /src/pages/contact-entreprises/ContactEntreprisesPage.js
'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ContactEntreprisesPage = () => {
  const [formData, setFormData] = useState({
    entreprise: '',
    contact: '',
    telephone: '',
    email: '',
    services: [],
    message: '',
    recontact: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleRecontactChange = (mode) => {
    setFormData(prev => ({
      ...prev,
      recontact: prev.recontact.includes(mode) 
        ? prev.recontact.filter(r => r !== mode)
        : [...prev.recontact, mode]
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Import dynamique d'EmailJS
      const emailjs = await import('@emailjs/browser');
      
      const templateParams = {
        company_name: formData.entreprise,
        contact_name: formData.contact,
        from_email: formData.email,
        from_phone: formData.telephone,
        services_list: formData.services.join(', '),
        recontact_methods: formData.recontact.join(', '),
        message: formData.message,
        to_name: 'Marie Starck',
        reply_to: formData.email
      };

      const response = await emailjs.send(
        'service_2dbbgpo',
        'template_gyas6ef',
        templateParams,
        'ma56SSZW45mrqSLHr'
      );

      console.log('Email entreprise envoyé avec succès:', response);
      setSubmitStatus({
        type: 'success',
        message: 'Votre demande a été envoyée avec succès ! Nous vous recontacterons rapidement selon vos préférences.'
      });

      // Reset du formulaire
      setFormData({
        entreprise: '',
        contact: '',
        telephone: '',
        email: '',
        services: [],
        message: '',
        recontact: []
      });

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-block px-6 py-3 text-black text-sm font-light mb-6 tracking-wider" style={{border: '1px solid #276f88'}}>
                CONTACT PROFESSIONNEL
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight">
                Demande de Devis
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Sublimez vos espaces professionnels. Contactez-nous dès aujourd'hui pour découvrir 
                nos solutions florales sur mesure adaptées à votre entreprise.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
                Écrivez-nous
              </h2>
              <div className="w-24 h-0.5 mx-auto mb-8" style={{backgroundColor: '#858585'}}></div>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                Partagez-nous vos besoins professionnels, nous vous répondrons dans les plus brefs délais 
                pour créer ensemble quelque chose de beau et adapté à votre entreprise.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="text"
                    name="entreprise"
                    placeholder="Nom de l'entreprise"
                    required
                    value={formData.entreprise}
                    onChange={handleInputChange}
                    className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="contact"
                    placeholder="Nom & prénom du contact"
                    required
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email professionnel"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="telephone"
                    placeholder="Téléphone"
                    required
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Services d'intérêt */}
              <div>
                <p className="text-gray-600 font-light mb-4">Services qui vous intéressent :</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Abonnement floral',
                    'Événements & séminaires', 
                    'Végétalisation des espaces',
                    'Arbre de Noël',
                    'Autre (préciser dans le message)'
                  ].map((service) => (
                    <label key={service} className="flex items-center cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                          className="sr-only"
                        />
                        <div 
                          className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all ${
                            formData.services.includes(service)
                              ? 'border-gray-800 bg-gray-800' 
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}
                        >
                          {formData.services.includes(service) && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-sm font-light text-black">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Décrivez-nous votre projet professionnel, vos besoins spécifiques, le nombre d'espaces à fleurir, la fréquence souhaitée..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 resize-none transition-all duration-300"
                ></textarea>
              </div>

              {/* Mode de recontact */}
              <div>
                <p className="text-gray-600 font-light mb-4">Souhaitez-vous être recontacté(e) par :</p>
                <div className="space-y-3">
                  {[
                    'Par téléphone',
                    'Par email',
                    'Pour convenir d\'un rendez-vous sur place'
                  ].map((mode) => (
                    <label key={mode} className="flex items-center cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.recontact.includes(mode)}
                          onChange={() => handleRecontactChange(mode)}
                          className="sr-only"
                        />
                        <div 
                          className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all ${
                            formData.recontact.includes(mode)
                              ? 'border-gray-800 bg-gray-800' 
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}
                        >
                          {formData.recontact.includes(mode) && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-sm font-light text-black">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-4 px-12 font-light text-white transition-all duration-300 tracking-wide hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{backgroundColor: '#276f88'}}
                >
                  {isSubmitting ? 'ENVOI EN COURS...' : 'ENVOYER LA DEMANDE'}
                </button>
                
                {/* Messages de statut sous le bouton */}
                {submitStatus.message && (
                  <div className={`mt-6 p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Informations complémentaires */}
        <div className="py-16" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              
              <div>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-white shadow-lg">
                  <svg className="w-8 h-8" style={{color: '#276f88'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-light text-black mb-3">Réactivité</h3>
                <p className="text-gray-600 font-light text-sm">
                  Réponse sous 24h pour toute demande de devis professionnel
                </p>
              </div>

              <div>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-white shadow-lg">
                  <svg className="w-8 h-8" style={{color: '#276f88'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-light text-black mb-3">Sur mesure</h3>
                <p className="text-gray-600 font-light text-sm">
                  Solutions adaptées à votre secteur et vos contraintes spécifiques
                </p>
              </div>

              <div>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-white shadow-lg">
                  <svg className="w-8 h-8" style={{color: '#276f88'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-light text-black mb-3">Proximité</h3>
                <p className="text-gray-600 font-light text-sm">
                  Déplacement sur site pour étudier vos espaces et vos besoins
                </p>
              </div>
            </div>

            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 font-light mb-6">
                Vous préférez nous contacter directement ?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:0603059195"
                  className="py-3 px-6 font-light text-black border border-gray-300 hover:border-gray-400 transition-all duration-300 tracking-wide inline-flex items-center justify-center"
                >
                  06 03 05 91 95
                </a>
                <a
                  href="mailto:contact@marie-starck.fr"
                  className="py-3 px-6 font-light text-black border border-gray-300 hover:border-gray-400 transition-all duration-300 tracking-wide inline-flex items-center justify-center"
                >
                  contact@marie-starck.fr
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactEntreprisesPage;