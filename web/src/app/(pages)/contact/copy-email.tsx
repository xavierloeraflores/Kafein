"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { Copy, Mail, Check } from "lucide-react";
import { socials } from "~/lib/constants";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      toast.success("Email copied!");
      setTimeout(() => setCopied(false), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to copy :(");
    }
  };
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle className="text-xl">Email Us</CardTitle>
        <CardDescription>
          Drop us a line and we&apos;ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={socials.email}
            readOnly
            className="bg-slate-50 text-center font-mono"
          />
          <Button
            onClick={copyEmail}
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy email address</span>
          </Button>
        </div>
        <p className="text-center text-sm text-slate-500">
          Click the copy button to copy our email address
        </p>
      </CardContent>
    </Card>
  );
}
