import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ColorModeToggle } from "./layout/ColorModeToggle";
export default function DesignSystem() {
  return (
    <main className="page-shell section">
      <div className="flex items-center gap-4">
        <h1>Component system</h1>
        <ColorModeToggle />
      </div>
      <p>
        Tab through controls to inspect focus. Default targets are 44px or
        larger.
      </p>
      <div className="flex flex-wrap gap-4 my-8">
        <Button>Default</Button>
        <Button variant="outline">Secondary</Button>
        <Button disabled>Disabled</Button>
        <Button disabled>
          <LoaderCircle className="animate-spin" aria-hidden="true" />
          Sending…
        </Button>
      </div>
      <FieldGroup className="max-w-md">
        <Field>
          <FieldLabel htmlFor="example">Name</FieldLabel>
          <Input id="example" placeholder="Your name" />
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="invalid">Email</FieldLabel>
          <Input
            id="invalid"
            aria-invalid
            aria-describedby="invalid-message"
            value="incomplete"
            readOnly
          />
          <span id="invalid-message">Enter a complete email address.</span>
        </Field>
      </FieldGroup>
      <Alert className="mt-8" variant="destructive">
        <AlertTitle>Message not sent</AlertTitle>
        <AlertDescription>
          Try again. Your message is still in the form.
        </AlertDescription>
      </Alert>
    </main>
  );
}
