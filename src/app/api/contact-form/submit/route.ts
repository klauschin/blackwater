import { NextResponse, NextRequest } from 'next/server';
import { formatObjectToHtml } from '@/lib/utils';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { sendToEmail, emailSubject, formData } = body;
	const authUser = process.env.EMAIL_SERVER_USER;
	const authPassword = process.env.EMAIL_SERVER_PASSWORD;
	const emailFrom = process.env.EMAIL_DISPLAY_NAME;

	try {
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
			port: Number(process.env.EMAIL_SERVER_PORT) || 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: authUser,
				pass: authPassword,
			},
		});
		const mailOptions = {
			from: `"${emailFrom}" <${authUser}>`,
			to: sendToEmail,
			replyTo: formData?.email || sendToEmail,
			subject: `${emailSubject}${formData?.name && ` [${formData.name}]`}`,
			html: formatObjectToHtml(formData),
		};

		const info = await transporter.sendMail(mailOptions);
		return Response.json(info);
	} catch (err) {
		console.error(err);
		const errorMessage =
			err instanceof Error ? err.message : 'An unknown error occurred';
		const errorDetails = err instanceof Error ? err.toString() : String(err);
		return NextResponse.json(
			{
				status: 'error',
				message: errorMessage,
				details: errorDetails,
			},
			{ status: 500 }
		);
	}
}
