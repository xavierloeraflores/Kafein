import { Card, CardContent } from "~/components/ui/card";
import CopyEmail from "./copy-email";
import FollowUs from "./follow-us";

export default function Contact() {
  return (
    <main className="flex-1">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="mx-auto max-w-2xl pt-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-md text-lg text-slate-600">
              We&apos;d love to hear from you. Send us an email or follow us on
              social media.
            </p>
          </div>

          <div className="grid gap-6">
            <CopyEmail />
            <FollowUs />
            <QuickResponse />
          </div>
        </div>
      </div>
    </main>
  );
}

function QuickResponse() {
  return (
    <Card className="border-0 bg-slate-900 text-white shadow-lg">
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="mb-2 font-semibold">Quick Response</h3>
          <p className="text-sm text-slate-300">
            We typically respond to emails and messages within 48 hours during
            business days.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
