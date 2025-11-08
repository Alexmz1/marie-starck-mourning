// Configuration EmailJS
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_2dbbgpo',
  templateIdCustomer: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CUSTOMER || 'template_lgsgrdj',
  templateIdCompany: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_COMPANY || 'template_gyas6ef',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'ma56SSZW45mrqSLHr'
}

// Service d'envoi d'emails
export const sendEmail = async (templateId, templateParams) => {
  try {
    // Dynamique import d'EmailJS pour éviter les erreurs SSR
    const emailjs = await import('@emailjs/browser')
    
    const response = await emailjs.send(
      emailjsConfig.serviceId,
      templateId,
      templateParams,
      emailjsConfig.publicKey
    )
    
    return { success: true, response }
  } catch (error) {
    console.error('Erreur EmailJS:', error)
    return { success: false, error: error.message }
  }
}