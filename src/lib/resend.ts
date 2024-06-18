import { MagicLinkEmail } from "@/components/emails/MagicLinkEmail";
import { WelcomeEmail } from "@/components/emails/WelcomeEmail";
import {
  SendVerificationRequestParams,
  EmailConfig,
} from "next-auth/providers/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const senderEmail =
  process.env.NODE_ENV === "production"
    ? process.env.EMAIL_FROM
    : "onboarding@resend.dev";

//todo: add email templates
export const sendWelcomeEmail = async ({
  name,
  email,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
}) => {
  const emailTemplate = WelcomeEmail({ name });
  try {
    await resend.emails.send({
      from: "Marc from Papermark <marc@papermark.io>",
      to: email as string,
      subject: "Welcome to Papermark!",
      react: emailTemplate,
    });
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  let {
    identifier: email,
    url,
    provider: { from },
  } = params;

  const emailTemplate = MagicLinkEmail({ url, from });
  console.log(email, url, from);

  try {
    await resend.emails.send({
      from: from,
      to: [email],
      subject: `Ссылка для входа в аккаунт`,
      react: emailTemplate,
    });
  } catch (error) {
    throw new Error("Error sending verification request");
  }
};
