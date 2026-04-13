const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prachitantia.com";
const CURRENT_YEAR = new Date().getFullYear();

const emailShell = (content: string, unsubscribeUrl: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f9f7f4;font-family:'Montserrat',Helvetica,Arial,sans-serif;color:#2c2c2c;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f7f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
          ${content}
          <!-- Footer -->
          <tr>
            <td style="background-color:#1a1a1a;padding:24px 48px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#888888;">
                You're receiving this because you subscribed at <a href="${SITE_URL}" style="color:#c9a84c;text-decoration:none;">prachitantia.com</a>.
              </p>
              <p style="margin:0 0 8px;font-size:12px;color:#555555;">
                &copy; ${CURRENT_YEAR} Prachi Tantia &middot; Avyukta Circle
              </p>
              <p style="margin:0;font-size:11px;">
                <a href="${unsubscribeUrl}" style="color:#888888;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const signature = `
  <tr>
    <td style="padding:0 48px 40px;border-top:1px solid #efefef;">
      <p style="margin:32px 0 4px;font-size:15px;line-height:1.8;color:#2c2c2c;">With clarity and gratitude,</p>
      <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#1a1a1a;">Prachi Tantia</p>
      <p style="margin:0 0 20px;font-size:13px;color:#888888;line-height:1.6;">Yoga Psychology Educator &amp; Mind Clarity Coach<br />Founder, Avyukta Circle</p>
      <p style="margin:0;font-size:13px;font-style:italic;color:#888888;line-height:1.6;border-top:1px solid #efefef;padding-top:20px;">
        &ldquo;The soul is the same in all living creatures, although the body of each is different.&rdquo;
      </p>
    </td>
  </tr>`;

export function buildWelcomeEmail(unsubscribeUrl: string): string {
  const content = `
    <!-- Header -->
    <tr>
      <td style="background-color:#1a1a1a;padding:40px 48px 36px;text-align:center;">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">Avyukta Circle</p>
        <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.3;">Welcome to the Circle</h1>
        <p style="margin:10px 0 0;font-size:13px;color:#a0a0a0;letter-spacing:1px;">Your Monday ritual starts now</p>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:44px 48px 0;">
        <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#2c2c2c;">I am so glad you've decided to join this space.</p>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#2c2c2c;">Whether you're here to find mental clarity, explore the depths of Yoga Psychology, or simply find a moment of stillness in a high-stress world, consider this your digital sanctuary. My mission with Avyukta Circle is to help high-performers like you align their internal vibration with their external goals.</p>
        <p style="margin:0 0 32px;font-size:15px;line-height:1.8;color:#2c2c2c;">By being here, you've taken a beautiful first step toward a more intentional life. I'm honoured to walk this path with you.</p>
      </td>
    </tr>
    <!-- What to Expect -->
    <tr>
      <td style="padding:0 48px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f7f4;border-left:3px solid #c9a84c;border-radius:0 6px 6px 0;padding:24px 28px;">
          <tr>
            <td>
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:700;">What to Expect</p>
              <p style="margin:0;font-size:15px;line-height:1.8;color:#2c2c2c;">I respect your inbox and your time. Moving forward, you can look forward to a <strong>Weekly Mind-Alignment Note arriving every Monday at 6:00 AM</strong>.</p>
              <p style="margin:12px 0 0;font-size:15px;line-height:1.8;color:#2c2c2c;">These notes are designed to be your morning ritual — a blend of ancient wisdom and modern psychology to help you start your week with a clear, focused lens.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Stay Connected -->
    <tr>
      <td style="padding:0 48px 12px;">
        <p style="margin:0 0 16px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:700;">Stay Connected</p>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#2c2c2c;">While you wait for next Monday's note, feel free to explore our community and resources:</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 48px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:0 0 12px;">
            <a href="https://avyuktacircle.com" style="display:block;padding:16px 20px;background-color:#f9f7f4;border-radius:6px;text-decoration:none;color:#2c2c2c;font-size:14px;line-height:1.5;">
              <span style="font-weight:700;color:#1a1a1a;">Avyukta Circle Website</span><br />
              <span style="color:#666666;">Explore our coaching frameworks and digital membership.</span>
            </a>
          </td></tr>
          <tr><td style="padding:0 0 12px;">
            <a href="https://www.instagram.com/prachi.avyuktacircle/" style="display:block;padding:16px 20px;background-color:#f9f7f4;border-radius:6px;text-decoration:none;color:#2c2c2c;font-size:14px;line-height:1.5;">
              <span style="font-weight:700;color:#1a1a1a;">Instagram</span><br />
              <span style="color:#666666;">Daily insights on Yoga Psychology and mindful living.</span>
            </a>
          </td></tr>
          <tr><td style="padding:0 0 12px;">
            <a href="https://www.youtube.com/@avyuktacircle" style="display:block;padding:16px 20px;background-color:#f9f7f4;border-radius:6px;text-decoration:none;color:#2c2c2c;font-size:14px;line-height:1.5;">
              <span style="font-weight:700;color:#1a1a1a;">YouTube / Nada Yoga</span><br />
              <span style="color:#666666;">Sound therapy and internal vibration practices.</span>
            </a>
          </td></tr>
        </table>
      </td>
    </tr>
    ${signature}`;
  return emailShell(content, unsubscribeUrl);
}

export function buildBroadcastEmail(subject: string, bodyHtml: string, unsubscribeUrl: string): string {
  const content = `
    <!-- Header -->
    <tr>
      <td style="background-color:#1a1a1a;padding:40px 48px 36px;text-align:center;">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">Avyukta Circle</p>
        <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">${subject}</h1>
        <p style="margin:10px 0 0;font-size:13px;color:#a0a0a0;letter-spacing:1px;">Your Weekly Mind-Alignment Note</p>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:44px 48px 32px;font-size:15px;line-height:1.9;color:#2c2c2c;">
        ${bodyHtml}
      </td>
    </tr>
    ${signature}`;
  return emailShell(content, unsubscribeUrl);
}
