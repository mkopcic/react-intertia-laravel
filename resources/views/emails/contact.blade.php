<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background-color:#060e20;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#060e20;padding:40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

                    {{-- Header --}}
                    <tr>
                        <td style="padding-bottom:32px;text-align:center;">
                            <p style="margin:0;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#91aaeb;font-weight:600;">The Architect</p>
                            <h1 style="margin:8px 0 0;font-size:28px;font-weight:700;color:#dee5ff;letter-spacing:-0.5px;">New Contact Message</h1>
                        </td>
                    </tr>

                    {{-- Card --}}
                    <tr>
                        <td style="background-color:#05183c;border-radius:16px;border:1px solid #2b4680;overflow:hidden;">

                            {{-- Green top bar --}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="background-color:#06b77f;padding:4px 0;"></td>
                                </tr>
                            </table>

                            {{-- Body --}}
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px;">
                                <tr>
                                    <td>
                                        {{-- Sender info --}}
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                                            <tr>
                                                <td width="50%" style="padding-right:12px;vertical-align:top;">
                                                    <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#91aaeb;font-weight:600;">From</p>
                                                    <p style="margin:0;font-size:16px;font-weight:600;color:#dee5ff;">{{ $senderName }}</p>
                                                </td>
                                                <td width="50%" style="padding-left:12px;vertical-align:top;">
                                                    <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#91aaeb;font-weight:600;">Email</p>
                                                    <p style="margin:0;font-size:16px;font-weight:600;color:#bdc2ff;">{{ $senderEmail }}</p>
                                                </td>
                                            </tr>
                                        </table>

                                        {{-- Divider --}}
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                                            <tr>
                                                <td style="border-top:1px solid #2b4680;"></td>
                                            </tr>
                                        </table>

                                        {{-- Message --}}
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td>
                                                    <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#91aaeb;font-weight:600;">Message</p>
                                                    <div style="background-color:#06122d;border-radius:10px;border:1px solid #2b4680;padding:24px;">
                                                        <p style="margin:0;font-size:15px;line-height:1.8;color:#c8d4f0;white-space:pre-wrap;">{{ $messageBody }}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                        {{-- Reply CTA --}}
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
                                            <tr>
                                                <td align="center">
                                                    <a href="mailto:{{ $senderEmail }}" style="display:inline-block;background-color:#06b77f;color:#001a12;font-weight:700;font-size:14px;padding:14px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">Reply to {{ $senderName }}</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="padding-top:32px;text-align:center;">
                            <p style="margin:0;font-size:12px;color:#4a5f8a;">This message was sent via the contact form on <a href="https://marijankopcic.from.hr" style="color:#91aaeb;text-decoration:none;">marijankopcic.from.hr</a></p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
