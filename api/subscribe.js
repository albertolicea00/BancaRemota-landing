export default async function handler(req, res) {
  const { email } = req.body ?? {};
  if (!email) return res.status(400).json({ error: 'Email requerido' });

  const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined;

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      ...(listId ? { listIds: [listId] } : {}),
    }),
  });

  if (response.ok) return res.status(200).json({ ok: true });

  const data = await response.json().catch(() => ({}));

  // Contact already exists — still a success from the user's perspective
  if (response.status === 400 && data?.code === 'duplicate_parameter') {
    return res.status(200).json({ ok: true });
  }

  console.error('Brevo error:', response.status, data);
  return res.status(500).json({ error: 'No pudimos guardar tu suscripción. Intenta de nuevo.' });
}
