# ProjectMind Voice Robot

Cara paling mudah:
1. Upload file ke GitHub Pages atau Netlify.
2. Buka dari Chrome Android.
3. Izinkan Microphone.
4. Tekan tombol mikrofon.

Untuk AI penuh:
- Buat n8n workflow: Webhook -> AI Agent -> Respond to Webhook.
- Request: {"message":"...","source":"ProjectMind Mobile"}
- Response: {"reply":"Jawaban AI"}
- Jangan simpan API key AI langsung di aplikasi mobile.
