import { Policy } from "@/components/policy";

const policyMessage =
  "This Achievments Generator is not sponsored, endorsed, or affiliated in any way with GirlScript Foundation or GirlScript Summer of Code - Extended (gssoc-ext). The content and functionality of this app are independently developed and maintained. Furthermore, the developer(s) of this app do not take any liability for errors or inaccuracies in the app. The developer(s) are not liable for any false data that is generated from this app. Users are advised to practice caution while inputting data in the fields, as incorrect or incomplete data may affect the app's functionality or results.";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>

        <Policy message={policyMessage} />

        <section className="space-y-4">
          <h3 className="text-xl font-semibold">1. Acceptance of Terms</h3>
          <p>
            By accessing or using our service, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. If you do
            not agree with any part of these terms, you may not use our service.
          </p>

          <h3 className="text-xl font-semibold">2. Use of Service</h3>
          <p>
            You agree to use our service only for lawful purposes and in a way
            that does not infringe the rights of, restrict or inhibit anyone
            else&apos;s use and enjoyment of the service.
          </p>

          <h3 className="text-xl font-semibold">3. Modifications to Service</h3>
          <p>
            We reserve the right to modify or discontinue, temporarily or
            permanently, the service (or any part thereof) with or without
            notice at any time.
          </p>
        </section>
      </main>
    </div>
  );
}
