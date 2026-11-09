export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, preferredTime, querySummary, fullTranscript } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const leadData = {
      targetEmail: 'contact@errorsync.com',
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : 'Not provided',
      preferredTime: preferredTime ? String(preferredTime).trim() : 'As soon as possible',
      querySummary: querySummary ? String(querySummary).trim() : 'General project inquiry',
      receivedAt: new Date().toISOString(),
    };

    console.log('[NEW LEAD DISPATCHED TO contact@errorsync.com]:', leadData);

    return res.status(200).json({
      success: true,
      message: 'Lead sent successfully to contact@errorsync.com',
      recipient: 'contact@errorsync.com',
      data: leadData,
    });
  } catch (error: any) {
    console.error('Lead submission error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
