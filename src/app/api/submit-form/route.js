import { NextResponse } from 'next/server';
import { formatObjectToHtml } from '@/lib/utils';
import nodemailer from 'nodemailer';

export async function POST(req) {
	const body = await req.json();
	const { sendToEmail, emailSubject, formData } = body;
	const authUser = process.env.EMAIL_SERVER_USER;
	const authPassword = process.env.EMAIL_SERVER_PASSWORD;
	const emailFrom = process.env.EMAIL_DISPLAY_NAME;

	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
			port: process.env.EMAIL_SERVER_PORT || 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: authUser,
				pass: authPassword,
			},
		});
		const mailOptions = {
			from: `"${emailFrom}" <${authUser}>`,
			to: sendToEmail,
			replyTo: formData?.email || sendToEmail, // TODO: replace email with FIELD_NAME
			subject: `${emailSubject}${formData?.name && ` [${formData.name}]`}`, // TODO: replace name with FIELD_NAME
			html: formatObjectToHtml(formData),
		};

		const info = await transporter.sendMail(mailOptions);
		return Response.json(info);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{
				status: 'error',
				message: err.message,
				details: err.toString(),
			},
			{ status: 500 }
		);
	}
}
