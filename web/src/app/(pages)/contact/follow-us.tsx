import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Instagram } from "lucide-react";
import { socials } from "~/lib/constants";

export default function FollowUs() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
          <Instagram className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-xl">Follow Us</CardTitle>
        <CardDescription>
          Stay updated with our latest news and behind-the-scenes content.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
        <p className="mt-3 text-center text-sm text-slate-500">
          Join our community of followers on Instagram
        </p>
      </CardContent>
    </Card>
  );
}
