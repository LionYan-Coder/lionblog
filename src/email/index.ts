import { Resend } from "resend";
import { resendKey } from "~/lib/env";

export const resend = new Resend(resendKey);