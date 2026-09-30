import smtplib
from email.message import EmailMessage

from app.core.config import settings


def send_otp_email(
    recipient_email: str,
    otp: str,
):
    message = EmailMessage()

    message["Subject"] = "EV Charging Station - Password Reset OTP"
    message["From"] = settings.EMAIL_FROM
    message["To"] = recipient_email

    message.set_content(
        f"""
Hello,

We received a request to reset your EV Charging Station account password.

Your password reset OTP is:

{otp}

This OTP is valid for 10 minutes.

If you did not request a password reset, you can safely ignore this email.

Regards,
EV Charging Station
"""
    )

    with smtplib.SMTP(
        settings.SMTP_HOST,
        settings.SMTP_PORT,
    ) as server:

        server.starttls()

        server.login(
            settings.SMTP_USERNAME,
            settings.SMTP_PASSWORD,
        )

        server.send_message(message)