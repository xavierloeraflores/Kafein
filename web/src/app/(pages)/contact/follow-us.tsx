import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Instagram, ExternalLink, Users } from "lucide-react";
import { socials } from "~/lib/constants";

export default function FollowUs() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
          <Users className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-xl">Follow Us</CardTitle>
        <CardDescription>
          Stay updated with our latest news and behind-the-scenes content.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
        >
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:underline"
          >
            <Instagram className="h-4 w-4" />
            Follow {socials.instagram_handle}
          </a>
        </Button>

        <Button
          asChild
          className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-blue-500 text-white hover:opacity-90"
        >
          <a
            href={socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:underline"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
            Follow {socials.tiktok_handle}
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full border-gray-300 hover:bg-gray-50"
        >
          <a
            href={socials.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            View All Links
          </a>
        </Button>

        <p className="mt-4 text-center text-sm text-slate-500">
          Join our community across all platforms
        </p>
      </CardContent>
    </Card>
  );
}
